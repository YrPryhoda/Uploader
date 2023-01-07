import { PrismaClient } from "@prisma/client";

class MessageNotificationService {
  async deleteNotification(userId: number, chatId: number) {
    const prisma = new PrismaClient();

    try {
      const notification = await prisma.messageNotification.deleteMany({
        where: {
          AND: {
            chatId,
            userId
          }
        }
      });
      await prisma.$disconnect();
      return notification;
    } catch (error) {
      await prisma.$disconnect();
    }
  }
}

export default new MessageNotificationService();

