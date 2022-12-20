import {
  loadGalleryPerPage,
  addImages,
  deleteImage,
  loadProfileImages,
  getByCoordinates,
  likeImage
} from "./images.actions";
import { AppState } from "../../index";
import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { modulePrefix } from "./images.prefix";

interface ImagesState {
  error: null | SerializedError;
  deleteLoading: boolean;
  loading: boolean;
  gallery: IImage[];
  page: number;
  galleryTotal: number;
  images: IImage[];
}

const initialState: ImagesState = {
  error: null,
  loading: false,
  deleteLoading: false,
  images: [],
  gallery: [],
  galleryTotal: 0,
  page: 1
};

const imagesSlice = createSlice({
  name: modulePrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadGalleryPerPage, (state, action) => {
        state.images = action.payload.images;
        state.galleryTotal = action.payload.total;
      })
      .addCase(loadProfileImages, (state, action) => {
        state.images = action.payload;
      })
      .addCase(addImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = [...state.images, ...action.payload];
        state.error = null;
      })
      .addCase(addImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteImage.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.galleryTotal -= 1;
        state.images = state.images.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error;
      })
      .addCase(getByCoordinates.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(getByCoordinates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByCoordinates.fulfilled, (state, action) => {
        state.images = action.payload.images;
        state.galleryTotal = action.payload.rows;
        state.loading = false;
      })
      .addCase(likeImage.fulfilled, (state, action) => {
        const { imageId, userId } = action.payload;
        const imageIndex = state.images.findIndex((el) => el.id === imageId);

        if (imageIndex < 0) {
          return;
        }

        const modifiedImageLikes = state.images[imageIndex].like;
        const existLikeIndex = modifiedImageLikes.findIndex(
          (el) => el.userId === userId
        );

        if (existLikeIndex < 0) {
          state.images[imageIndex].like = [
            ...modifiedImageLikes,
            action.payload
          ];
        } else {
          state.images[imageIndex].like = modifiedImageLikes.filter(
            (el) => el.userId !== userId
          );
        }
      })
      .addCase(likeImage.rejected, (state, action) => {
        state.error = action.error;
      })
});

export const imagesSliceSelector = (state: AppState) => state[modulePrefix];

export default imagesSlice;

