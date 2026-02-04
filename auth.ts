import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub,Google],
  callbacks:{
    async jwt({token,user,account}) {
        if(user){
            token.id=user.id
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
        }
        return session
    }
  }
})