import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    backendAccessToken?: string
    error?: string
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    backendAccessToken?: string
    backendRefreshToken?: string
    backendAccessTokenExpires?: number
    error?: string
  }
}