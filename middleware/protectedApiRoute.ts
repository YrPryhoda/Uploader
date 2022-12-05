import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

export const protectedApiRoute = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    console.log(session, "SESSION");

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    handler(req, res);
  };
};

