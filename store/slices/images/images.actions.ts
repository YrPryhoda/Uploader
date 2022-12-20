import {
  createAction,
  createAsyncThunk,
  SerializedError
} from "@reduxjs/toolkit";
import { modulePrefix } from "./images.prefix";
import imagesService from "./images.service";

export const loadGalleryPerPage = createAction<{
  images: IImage[];
  total: number;
}>(`${modulePrefix}/load-gallery`);
export const loadProfileImages = createAction<IImage[]>(
  `${modulePrefix}/load-profile-images`
);

export const addImages = createAsyncThunk<IImage[], FormData>(
  `${modulePrefix}/add`,
  async (imagesFormData, options) => {
    try {
      const data = await imagesService.create(imagesFormData);
      return data.data;
    } catch (error: unknown) {
      console.log(error, "ERROR");
      throw options.rejectWithValue({ error: error as SerializedError });
    }
  }
);

export const deleteImage = createAsyncThunk<IImage, number>(
  `${modulePrefix}/delete`,
  async (id, options) => {
    try {
      return await imagesService.delete(id);
    } catch (error) {
      console.log(error, "ERROR");
      throw options.rejectWithValue(error as SerializedError);
    }
  }
);

export const getByCoordinates = createAsyncThunk<
  { images: IImage[]; rows: number },
  IGeo & { page: number }
>(`${modulePrefix}/by-coordinates`, async (params, options) => {
  try {
    const result = await imagesService.getByCoordinates(params);

    return result;
  } catch (error) {
    console.log(error, "ERROR");
    throw options.rejectWithValue(error as SerializedError);
  }
});

export const likeImage = createAsyncThunk<ILike, { imageId: number }>(
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

