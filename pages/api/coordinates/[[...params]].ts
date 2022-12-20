import {
  BadRequestException,
  createHandler,
  Get,
  Param,
  Req
} from "next-api-decorators";
import type { NextApiRequest } from "next";
import imageService from "../../../service/image.service";

class CoordinatesHandler {
  @Get()
  async getByCoordinates(@Req() req: NextApiRequest) {
    try {
      const { lat, lng } = req.query;
			const page = Number(req.query.page) || 1;
      const parsedCoordinates = { lat: Number(lat), lng: Number(lng), page };
      if (isNaN(parsedCoordinates.lat) || isNaN(parsedCoordinates.lng)) {
        throw new BadRequestException("Invalid coordinates");
      }

      return await imageService.getByCoordinates(parsedCoordinates);
    } catch (error) {
      const err = error as Error;
      return new BadRequestException(err.message);
    }
  }

  @Get("/:lat/:lng")
  async getOne(@Param("lat") lat: string, @Param("lng") lng: string) {
    try {
    } catch (error) {
      const err = error as Error;
      return new BadRequestException(err.message);
    }
  }
}

export default createHandler(CoordinatesHandler);

