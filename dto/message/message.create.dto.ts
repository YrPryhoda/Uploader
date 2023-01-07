import { IsNotEmpty, IsString } from "class-validator";

export class MessageCreateDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  chatId: number;

  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  recieverId: number;
}

