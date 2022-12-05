import { BadRequestException } from "next-api-decorators";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        await prisma.$disconnect();
        return res.status(200).json({ data: [] });
      }

      const data = await prisma.image.findMany({
        where: { userId: id }
      });

      await prisma.$disconnect();
      return res.status(200).json({ data });
    } catch (error) {
      const err = error as Error;
      throw new BadRequestException(err.message);
    }
  }
}

