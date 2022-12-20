import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

import imageService from "../../../service/image.service";
import { getFormidable } from "../../../lib/formidable";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    try {
      const session = await getSession({ req });

      if (!session) {
        await prisma.$disconnect();
        return res.status(401).json({ msg: "Unauthorized" });
      }
      const form = await getFormidable();

      form.parse(req, async (err, meta, files) => {
        let parsedCoords: IGeo | null = null;
        if (err) {
          return res.status(400).json({ msg: "Uploading images error" });
        }

        if (meta.coordinates) {
          parsedCoords = JSON.parse(meta.coordinates as string);
        }

        if (Array.isArray(files.images)) {
          const data = await Promise.all(
            files.images.map(async (el) => {
              return await prisma.image.create({
                data: {
                  title: el.newFilename,
                  description: `${el.size}`,
                  userId: Number(session.user.id),
                  lat: parsedCoords ? parsedCoords.lat : null,
                  lng: parsedCoords ? parsedCoords.lng : null
                }
              });
            })
          );

          await prisma.$disconnect();
          return res.status(200).json({ data });
        }

        const data = await prisma.image.create({
          data: {
            title: files.images.newFilename,
            description: `${files.images.size}`,
            userId: Number(session.user.id),
            lat: parsedCoords ? parsedCoords.lat : null,
            lng: parsedCoords ? parsedCoords.lng : null
          }
        });

        await prisma.$disconnect();
        return res.status(200).json({ data: [data] });
      });
    } catch (error) {
      const err = error as Error;
      return res.json({ msg: err.message });
    }
  } else if (req.method === "GET") {
    try {
      const { page } = req.query;
      let numPage = Number(page);

      if (isNaN(numPage)) {
        numPage = 0;
      }

      const { rows, images } = await imageService.all(numPage);

      await prisma.$disconnect();
      res.status(200).json({ images, rows });
    } catch (error) {
      console.log(error, "ERR");
      return res.status(403).json({ msg: "Some errors" });
    }
  }
}

