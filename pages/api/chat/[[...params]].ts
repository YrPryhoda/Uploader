import {
  BadRequestException,
  Body,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseNumberPipe,
  Post,
  Req,
  ValidationPipe,
  createHandler
} from "next-api-decorators";
import type { AuthorizedNextApiRequest } from "next-auth";

import messageNotificationService from "../../../service/messageNotification.service";
import { ProtectedApiDecorator } from "../../../middleware/protectedApiDecotator";
import { MessageCreateDto } from "./../../../dto/message/message.create.dto";
import { ChatResponseDto } from "./../../../dto/chat/chat.response.dto";
import { UserResponseDto } from "./../../../dto/user/user.response.dto";
import chatService from "../../../service/chat.service";
import messageService from "../../../service/message.service";

@ProtectedApiDecorator()
class ChatHandler {
  @Get("/get-chat/:recieverId")
  async getChat(
    @Param("recieverId", ParseNumberPipe) recieverId: number,
    @Req() req: AuthorizedNextApiRequest
  ) {
    try {
      const senderId = Number(req.user.id);

      if (senderId === recieverId) {
        throw new BadRequestException("Can not send message to yourself");
      }

      const chat = await chatService.findOrCreateChat(senderId, recieverId);
      return new ChatResponseDto(chat);
    } catch (error) {
      const err = error as Error;
      throw new BadRequestException(err.message);
    }
  }

  @Post("/create-message")
  async create(
    @Body(ValidationPipe) body: MessageCreateDto,
    @Req() req: AuthorizedNextApiRequest
  ) {
    try {
      const userId = Number(req.user.id);

      if (userId !== body.authorId) {
        throw new ForbiddenException("Action not allowed");
      }

      const message = await messageService.create(
        body.authorId,
        body.recieverId,
        body.chatId,
        body.text
      );

      if (!message) {
        throw new Error("Send message error");
      }

      return await chatService.getChatMessages(body.chatId);
    } catch (error) {
      const err = error as Error;
      console.log(error);
      throw new BadRequestException(err.message);
    }
  }

  @Get("/update-chat-messages/:chatId")
  async updateChatMessages(
    @Param("chatId", ParseNumberPipe) chatId: number,
    @Req() req: AuthorizedNextApiRequest
  ) {
    try {
      const userId = Number(req.user.id!);
      const updatedChat = await messageService.changeStatus(chatId, userId);
      const messages = await chatService.getChatMessages(chatId);
      return messages;
    } catch (error) {
      const err = error as Error;
      console.log(error, "ERROR");
      throw new BadRequestException(err.message);
    }
  }

  @Get("/:chatId")
  async getChatById(@Param("chatId", ParseNumberPipe) chatId: number) {
    try {
      const chat = await chatService.getChatMessages(chatId);

      if (!chat) {
        throw new NotFoundException("Not found");
      }

      return {
        ...chat,
        members: chat.members.map((user) => new UserResponseDto(user))
      };
    } catch (error) {
      const err = error as Error;
      console.log(error, "ERROR");
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getUsersChats(@Req() req: AuthorizedNextApiRequest) {
    try {
      const userId = req.user.id!;
      return await chatService.findUsersChats(Number(userId));
    } catch (error) {
      const err = error as Error;
      console.log(error);
      throw new BadRequestException(err.message);
    }
  }

  @Delete("/delete-chat-notifications/:userId/:chatId")
  async deleteNotifications(
    @Param("userId", ParseNumberPipe) userId: number,
    @Param("chatId", ParseNumberPipe) chatId: number
  ) {
    try {
      return await messageNotificationService.deleteNotification(
        userId,
        chatId
      );
    } catch (error) {
      const err = error as Error;
      console.log(error);
      throw new BadRequestException(err.message);
    }
  }
}

export default createHandler(ChatHandler);

