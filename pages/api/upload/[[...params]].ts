import type { NextApiResponse } from "next";
import type { AuthorizedNextApiRequest } from "next-auth";
import {
  Post,
  Req,
  BadRequestException,
  createHandler,
  Res
} from "next-api-decorators";
import path from "path";

import { ProtectedApiDecorator } from "../../../middleware/protectedApiDecotator";
import { getFormidable } from "../../../lib/formidable";
import userService from "../../../service/user.service";

class UploadHandler {
  @ProtectedApiDecorator()
  @Post("/avatar")
  async avatar(
    @Req() req: AuthorizedNextApiRequest,
    @Res() res: NextApiResponse
  ) {
    try {
      const userId = req.user.id!;
      const userDir = path.join(process.cwd(), "public", userId.toString());

      const form = await getFormidable(userDir);
      await new Promise(() =>
        form.parse(req, async (err, meta, files) => {
          if (err as Error) {
            throw new BadRequestException(err.message);
          }

          if (Array.isArray(files.avatar)) {
            throw new BadRequestException("Multiple files are forbidden");
          }

          const updatedUser = await userService.update(Number(userId), {
            avatar: files.avatar.newFilename
          });

          return res.status(200).json(updatedUser);
        })
      );
    } catch (error) {
      const err = error as Error;
      throw new BadRequestException(err.message);
    }
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default createHandler(UploadHandler);

