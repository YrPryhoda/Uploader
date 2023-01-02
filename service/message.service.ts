import { PrismaClient } from "@prisma/client";

class MessageService {
  async create(authorId: number, chatId: number, text: string) {
    const prisma = new PrismaClient();
    try {
      const message = await prisma.message.create({
        data: {
          authorId,
          chatId,
          text
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
}

export default new MessageService();

