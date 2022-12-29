import {
  SerializedError,
  createAction,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { modulePrefix } from "./search.prefix";
import imagesService from "../images/images.service";

export const getUserAccount = createAction<IUser>(
  `${modulePrefix}/user-account`
);

export const likeProfileImage = createAsyncThunk<ILike, { imageId: number }>(
  `${modulePrefix}/like-image`,
  async (params, options) => {
    try {
      return await imagesService.imageLike({ imageId: params.imageId });
    } catch (error) {
      console.log(error, "ERROR");
      throw options.rejectWithValue(error as SerializedError);
    }
  }
);

