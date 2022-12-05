import { PrismaClient } from "@prisma/client";

class ImageService {
  async all(skip = 0, take = 4) {
    const prisma = new PrismaClient();

    const offset = skip < 2 ? 0 : (skip - 1) * take;

    const transaction = await prisma.$transaction([
      prisma.image.count(),
      prisma.image.findMany({
        skip: offset,
        take,

        orderBy: {
          createdAt: "desc"
        }
      })
    ]);

    const [rows, images] = transaction;

    await prisma.$disconnect();
    return { rows, images };
  }
}

export default new ImageService();

