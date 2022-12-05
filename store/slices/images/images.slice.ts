import {
  loadGalleryPerPage,
  addImages,
  deleteImage,
  loadProfileImages
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
        state.gallery = action.payload.gallery;
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
        state.gallery = state.gallery.filter(
          (el) => el.id !== action.payload.id
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error;
      })
});

export const imagesSliceSelector = (state: AppState) => state[modulePrefix];

export default imagesSlice;

