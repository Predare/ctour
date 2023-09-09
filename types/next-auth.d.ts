import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's avatar. */
      avatar: string
      color: string
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    avatar: string
    color: string
  }

}