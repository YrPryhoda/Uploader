import { BadRequestException } from "next-api-decorators";
import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

import imageService from "../../../../service/image.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    try {
      const id = Number(req.query.id);
      const page = Number(req.query.page);

      if (isNaN(id)) {
        return res.status(200).json({ data: [] });
      }

      const data = await imageService.getUserUpload({ userId: id, page });

      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      throw new BadRequestException(err.message);
    } finally {
      await prisma.$disconnect();
    }
  }
}

