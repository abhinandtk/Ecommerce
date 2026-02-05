import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    backendAccessToken?:string
    user: {
      id: string
    }
  }

  interface User {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    accessToken?: string
  }
}
