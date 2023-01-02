import { MessageCreateDto } from "./../../../dto/message/message.create.dto";
import {
  BadRequestException,
  Body,
  Get,
  Post,
  Req,
  ValidationPipe,
  createHandler
} from "next-api-decorators";
import type { AuthorizedNextApiRequest } from "next-auth";

import { ProtectedApiDecorator } from "../../../middleware/protectedApiDecotator";
import { ChatGetDto } from "./../../../dto/chat/chat.get.dto";
import chatService from "../../../service/chat.service";
import messageService from "../../../service/message.service";

@ProtectedApiDecorator()
class ChatHandler {
  @Post("/get-chat")
  async getChat(@Body(ValidationPipe) body: ChatGetDto) {
    try {
      return await chatService.findOrCreateChat(body.senderId, body.recieverId);
    } catch (error) {
      const err = error as Error;
      return new BadRequestException(err.message);
    }
  }

  @Post("/create-message")
  async create(@Body(ValidationPipe) body: MessageCreateDto) {
    try {
      const message = await messageService.create(
        body.authorId,
        body.chatId,
        body.text
      );

      return message;
    } catch (error) {
      const err = error as Error;
      console.log(error);
      return new BadRequestException(err.message);
    }
  }

  @Get("/")
  async getUsersChats(@Req() req: AuthorizedNextApiRequest) {
    try {
      const userId = req.user.id!;
      return await chatService.findUsersChats(Number(userId));
    } catch (error) {
      const err = error as Error;
      console.log(error);
      return new BadRequestException(err.message);
    }
  }
}

export default createHandler(ChatHandler);

