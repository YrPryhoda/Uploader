import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "next-api-decorators";

class ImageService {
  async all(skip = 0, take = 4) {
    const prisma = new PrismaClient();

    const offset = skip < 2 ? 0 : (skip - 1) * take;

    const transaction = await prisma.$transaction([
      prisma.image.count(),
      prisma.image.findMany({
        skip: offset,
        take,
        include: { like: true },
        orderBy: {
          createdAt: "desc"
        }
      })
    ]);

    const [rows, images] = transaction;

    await prisma.$disconnect();
    return { rows, images };
  }

  async getUserUpload(options: { userId: number; page: number }) {
    const prisma = new PrismaClient();
    const skip = options.page;
    const take = 4;
    const offset = skip < 2 ? 0 : (skip - 1) * take;
    const where = { userId: options.userId };

    const transaction = await prisma.$transaction([
      prisma.image.count({ where }),
      prisma.image.findMany({
        where,
        take,
        skip: offset,
        include: { like: true },
        orderBy: {
          createdAt: "desc"
        }
      })
    ]);

    const [rows, images] = transaction;
    await prisma.$disconnect();
    return { rows, images };
  }

  async getByCoordinates(options: IGeo & { page: number }) {
    const prisma = new PrismaClient();
    const latRange = { from: options.lat - 0.5, to: options.lat + 0.5 };
    const lngRange = { from: options.lng - 1, to: options.lng + 1 };
    const skip = options.page;
    const take = 4;
    const offset = skip < 2 ? 0 : (skip - 1) * take;

    const where = {
      lat: {
        gte: latRange.from,
        lte: latRange.to
      },
      lng: {
        gte: lngRange.from,
        lte: lngRange.to
      }
    };

    const transaction = await prisma.$transaction([
      prisma.image.count({ where }),
      prisma.image.findMany({
        where,
        skip: offset,
        take,
        include: { like: true },
        orderBy: {
          createdAt: "desc"
        }
      })
    ]);
    const [rows, images] = transaction;

    await prisma.$disconnect();
    return { rows, images };
  }

  async like(options: { userId: number; imageId: number }) {
    const prisma = new PrismaClient();
    const image = await prisma.image.findUnique({
      where: { id: options.imageId }
    });

    if (!image) {
      await prisma.$disconnect();
      throw new NotFoundException("Not Found");
    }

    const existLike = await prisma.like.findFirst({
      where: {
        userId: options.userId,
        imageId: options.imageId
      }
    });

    if (existLike) {
      const deleted = await prisma.like.delete({
        where: { id: existLike.id }
      });

      await prisma.$disconnect();
      return deleted;
    }

    const like = await prisma.like.create({
      data: {
        imageId: options.imageId,
        userId: options.userId
      }
    });

    await prisma.$disconnect();
    return like;
  }

  async rating() {
    const prisma = new PrismaClient();
    const data = await prisma.image.findMany({
      include: {
        like: true,
        user: true,
        _count: {
          select: {
            like: true
          }
        }
      },
      orderBy: {
        like: {
          _count: "desc"
        }
      },
      take: 10
    });

    await prisma.$disconnect();
    return data;
  }
}

export default new ImageService();

