import {
  createAction,
  createAsyncThunk,
  SerializedError
} from "@reduxjs/toolkit";
import { modulePrefix } from "./images.prefix";
import imagesService from "./images.service";

export const loadGalleryPerPage = createAction<{
  gallery: IImage[];
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

