import NextAuth, { DefaultSession } from "next-auth";
import { NextApiRequest } from "next";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface AuthorizedNextApiRequest extends NextApiRequest {
    user: Session["user"];
  }
}

