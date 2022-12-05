import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userService from "../../../service/user.service";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/sign-in"
  },
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        if (session.user) {
          session.user.id = token.sub;
        }
      }

      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          const user = await userService.login(email, password);
          if (!user) {
            throw new Error("Auth failed");
          }

          return {
            ...user,
            id: user.id.toString()
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    })
  ]
};
export default NextAuth(authOptions);

