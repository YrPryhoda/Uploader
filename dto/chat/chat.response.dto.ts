import { UserResponseDto } from "./../user/user.response.dto";
export class ChatResponseDto {
  readonly id: number;
  readonly createdAt: Date;
  readonly messages: IMessage[];
  readonly members: UserResponseDto[];

  constructor(chat: IChat) {
    this.id = chat.id;
    this.createdAt = chat.createdAt;
    this.members = chat.members.map((el) => new UserResponseDto(el));
    this.messages = chat.messages;
  }
}

