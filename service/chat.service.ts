import { NotFoundError } from "@prisma/client/runtime";
import { PrismaClient } from "@prisma/client";
import { ProtectedApiDecorator } from "../middleware/protectedApiDecotator";

@ProtectedApiDecorator()
class ChatService {
  async getChatMessages(chatId: number) {
    const prisma = new PrismaClient();
    try {
      const chatContent = await prisma.chat.findUnique({
        where: {
          id: chatId
        },
        include: {
          members: true,
          messages: {
            take: 30,
            orderBy: {
              createdAt: "asc"
            },
            include: {
              author: true
            }
          }
        }
      });
      await prisma.$disconnect();
      return chatContent;
    } catch (error) {
      await prisma.$disconnect();
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async findUsersChats(userId: number) {
    const prisma = new PrismaClient();
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          chats: {
            include: {
              messages: {
                include: {
                  author: {
                    select: {
                      id: true,
                      avatar: true,
                      name: true
                    }
                  }
                },
                orderBy: { createdAt: "desc" },
                take: 1
              },
              members: {
                select: {
                  email: true,
                  name: true,
                  id: true,
                  avatar: true
                }
              }
            }
          }
        }
      });
      await prisma.$disconnect();
      return user?.chats;
    } catch (error) {
      await prisma.$disconnect();
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async findOrCreateChat(senderId: number, recieverId: number) {
    const prisma = new PrismaClient();
    try {
      const userWithChat = await prisma.user.findUnique({
        include: {
          chats: {
            include: {
              members: true,
              messages: true
            },
            where: {
              members: {
                some: {
                  id: recieverId
                }
              }
            }
          }
        },
        where: {
          id: senderId
        }
      });

      if (!userWithChat) {
        throw new NotFoundError("User not found");
      }

      if (!userWithChat.chats.length) {
        const newChat = await prisma.chat.create({
          include: { members: true, messages: true },
          data: {
            members: {
              connect: [{ id: senderId }, { id: recieverId }]
            }
          }
        });

        await prisma.$disconnect();
        return newChat;
      }

      await prisma.$disconnect();
      return userWithChat.chats[0];
    } catch (error) {
      console.log(error);
      await prisma.$disconnect();
      throw new Error();
    }
  }
}

export default new ChatService();

