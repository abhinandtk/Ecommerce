import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(
      `${process.env.DJANGO_API_URL}/api/token/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refresh: token.backendRefreshToken,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw data;

    const decoded = JSON.parse(
      Buffer.from(data.access.split(".")[1], "base64").toString()
    );

    return {
      ...token,
      backendAccessToken: data.access,
      backendAccessTokenExpires: decoded.exp * 1000,
      backendRefreshToken: data.refresh ?? token.backendRefreshToken,
      error: undefined,
    };
  } catch (error) {
    console.error("Refresh failed", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],

  callbacks: {
    async jwt({ token, user, account }) {

      // 🔹 First login
      if (user && account) {
        token.id = user.id;

        const res = await fetch(
          `${process.env.DJANGO_API_URL}/api/auth/sync-user/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              provider: account.provider,
            }),
          }
        );

        if (!res.ok) throw new Error("Sync user failed");

        const data = await res.json();

        const decoded = JSON.parse(
          Buffer.from(data.access.split(".")[1], "base64").toString()
        );

        token.backendAccessToken = data.access;
        token.backendRefreshToken = data.refresh;
        token.backendAccessTokenExpires = decoded.exp * 1000;

        return token;
      }

      // 🔹 If no expiry info yet
      if (!token.backendAccessTokenExpires) {
        return token;
      }

      // 🔹 If token still valid
      if (
  typeof token.backendAccessTokenExpires === "number" &&
  Date.now() < token.backendAccessTokenExpires
) {
  return token;
}

      // 🔹 Expired → refresh
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.backendAccessToken = token.backendAccessToken as string;
      session.error = token.error as string | undefined;

      // 🚫 DO NOT expose refresh token
      return session;
    },
  },
});