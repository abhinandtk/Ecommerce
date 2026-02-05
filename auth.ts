import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub,Google],
  callbacks:{
    async jwt({token,user,account}) {
        if(user && account){
            token.id=user.id
            const res = await fetch(
          `${process.env.DJANGO_API_URL}/api/auth/sync-user/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              provider: account?.provider,
            }),
          }
        )

        if (res.ok) {
          const data = await res.json()
          console.log(data,'checkingresponsedata')

          // 🔐 Store Django JWT in NextAuth token
          token.backendAccessToken = data.access
          token.backendRefreshToken = data.refresh
        } else {
          console.error("Failed to sync user with backend", await res.text())
        }
        }
        if(account){
            token.accessToken=account.access_token
        }
        return token
    },
    async session({session,token}){
        if(token.id){
            session.user.id=token.id as string
        }
        if(token?.accessToken){
            session.accessToken=token.accessToken as string
             session.backendAccessToken = token.backendAccessToken as string
        }
        return session
    }
  }
})