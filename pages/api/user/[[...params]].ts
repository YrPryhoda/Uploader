import type { AuthorizedNextApiRequest } from "next-auth";
import { UserRatingResponseDto } from "./../../../dto/user/userRating.response.dto";
import * as nextAuth from "next-auth";
import {
  BadRequestException,
  Body,
  createHandler,
  Get,
  InternalServerErrorException,
  Param,
  ParseNumberPipe,
  Post,
  Req,
  ValidationPipe
} from "next-api-decorators";

import { ChangePasswordUserDto } from "./../../../dto/user/change-password.user.dto";
import { ProtectedApiDecorator } from "../../../middleware/protectedApiDecotator";
import { UserResponseDto } from "../../../dto/user/user.response.dto";
import { CreateUserDto } from "./../../../dto/user/create.user.dto";
import userService from "../../../service/user.service";
import { getFormidable } from "../../../lib/formidable";
import path from "path";

class UserHandler {
  @ProtectedApiDecorator()
  @Get()
  async users() {
    try {
      return await userService.all();
    } catch (error) {
      const err = error as Error;
      return new InternalServerErrorException(err.message);
    }
  }

  @Get("/rating")
  async usersRating() {
    try {
      const users: IUserRating[] = await userService.rating();

      return users.map((user) => new UserRatingResponseDto(user));
    } catch (error) {
      const err = error as Error;
      throw new BadRequestException(err.message);
    }
  }

  @Get("/:id")
  async user(@Param("id", ParseNumberPipe) id: number) {
    try {
      const user = await userService.findByUnique({ id });
      if (!user) {
        throw Error("Not found");
      }
      return new UserResponseDto(user);
    } catch (error) {
      const err = error as Error;
      throw new BadRequestException(err.message);
    }
  }

  @Post("/sign-up")
  async create(@Body(ValidationPipe) body: CreateUserDto) {
    try {
      const { password, confirmPassword, email, name } = body;

      const existUser = await userService.findByUnique({ email });

      if (existUser) {
        throw Error("This e-mail already registered");
      }

      if (password !== confirmPassword) {
        throw Error("Passwords are different");
      }

      const user = await userService.create({ password, email, name });
      return new UserResponseDto(user);
    } catch (error: unknown) {
      const err = error as Error;
      throw new BadRequestException(err.message);
    }
  }

  @ProtectedApiDecorator()
  @Post("/change-password")
  async changePassword(
    @Body() body: ChangePasswordUserDto,
    @Req() req: nextAuth.AuthorizedNextApiRequest
  ) {
    try {
      const id = Number(req.user.id!);

      const user = await userService.changePassword(id, body);
      return new UserResponseDto(user);
    } catch (error: unknown) {
      const err = error as Error;
      throw new BadRequestException(err.message);
    }
  }
}

export default createHandler(UserHandler);

