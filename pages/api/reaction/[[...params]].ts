import { UserResponseDto } from "./../../../dto/user/user.response.dto";
import {
  BadRequestException,
  Body,
  createHandler,
  Get,
  Param,
  ParseNumberPipe,
  Post,
  Req
} from "next-api-decorators";
import type { AuthorizedNextApiRequest } from "next-auth";
import { ProtectedApiDecorator } from "../../../middleware/protectedApiDecotator";
import imageService from "../../../service/image.service";

class ReactionHandler {
  @Get("/rating")
  async rating() {
    try {
      const top = await imageService.rating();
      return top.map((el) => {
        return {
          ...el,
          user: new UserResponseDto(el.user)
        };
      });
    } catch (error: unknown) {
      const err = error as Error;
      return new BadRequestException(err.message);
    }
  }

  @ProtectedApiDecorator()
  @Get("/:imageId")
  async likeIt(
    @Req() req: AuthorizedNextApiRequest,
    @Param("imageId", ParseNumberPipe) imageId: number
  ) {
    try {
      const user = req.user;

      return await imageService.like({ userId: Number(user.id), imageId });
    } catch (error: unknown) {
      const err = error as Error;
      return new BadRequestException(err.message);
    }
  }
}

export default createHandler(ReactionHandler);

