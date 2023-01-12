import { PrismaClient } from "@prisma/client";

class MessageService {
  async findMessage(id: number) {
    const prisma = new PrismaClient();

    try {
      const message = await prisma.message.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              avatar: true,
              id: true,
              name: true
            }
          }
        }
      });

      await prisma.$disconnect();
      return message;
    } catch (error: unknown) {
      await prisma.$disconnect();
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async create(
    authorId: number,
    recieverId: number,
    chatId: number,
    text: string
  ) {
    const prisma = new PrismaClient();
    try {
      const message = await prisma.message.create({
        data: {
          authorId,
          chatId,
          text,
          messageNotification: {
            create: {
              userId: recieverId,
              chatId
            }
          }
        }
      });

      await prisma.$disconnect();
      return message;
    } catch (error: unknown) {
      await prisma.$disconnect();
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async changeStatus(chatId: number, userId: number) {
    const prisma = new PrismaClient();
    try {
      const updatedMessage = await prisma.message.updateMany({
        where: {
          AND: {
            chatId,
            NOT: { authorId: userId }
          }
        },
        data: {
          status: "read"
        }
      });

      await prisma.$disconnect();
      return updatedMessage;
    } catch (error: unknown) {
      await prisma.$disconnect();
      const err = error as Error;
      throw new Error(err.message);
    }
  }
}

export default new MessageService();

