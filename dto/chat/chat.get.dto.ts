import { IsNotEmpty, isNumber } from "class-validator";

export class ChatGetDto {
  @IsNotEmpty()
  senderId: number;

  @IsNotEmpty()
  recieverId: number;
}

