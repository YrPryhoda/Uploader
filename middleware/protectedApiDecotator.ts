import { getSession } from "next-auth/react";
import { NextApiResponse } from "next";
import {
  createMiddlewareDecorator,
  ForbiddenException,
  NextFunction
} from "next-api-decorators";
import { AuthorizedNextApiRequest } from "next-auth";

export const ProtectedApiDecorator = createMiddlewareDecorator(
  async (
    req: AuthorizedNextApiRequest,
    res: NextApiResponse,
    next: NextFunction
  ) => {
    try {
      const session = await getSession({ req });

      if (!session) {
        throw Error();
      }

      req.user = session.user;
      next();
    } catch (error) {
      console.log(error, "Middleware Decorator");
      throw new ForbiddenException("Unauthorized");
    }
  }
);

