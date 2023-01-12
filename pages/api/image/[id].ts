import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "DELETE") {
    try {
      const idStr = req.query.id;
      const id = Number(idStr);
      const itemToDelete = await prisma.image.findUnique({ where: { id } });
      if (!itemToDelete) {
        throw Error("Element does not exist");
      }

      const imagePath = path.resolve(
        process.cwd(),
        "public",
        "imagesDB",
        itemToDelete.title
      );
      try {
        try {
          await fs.access(imagePath);
          await fs.unlink(imagePath);
        } catch (_) {
          console.log("This image is link from Internet");
        }
      } catch (error) {
        console.log(error);
      }
      const deletedItem = await prisma.image.delete({ where: { id } });

      res.status(200).json(deletedItem);
    } catch (error: unknown) {
      const err = error as Error;
      console.log(error);
      res.status(400).json({ msg: err.message });
    } finally {
      await prisma.$disconnect();
    }
  }
}

