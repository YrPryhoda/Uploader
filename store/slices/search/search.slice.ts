import { getUserAccount, likeProfileImage } from "./search.actions";
import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../..";
import { modulePrefix } from "./search.prefix";
import { uploadAvatar } from "../user/user.actions";

interface InitialState {
  error: SerializedError | null;
  loading: boolean;
  searchUser: IUser | null;
}

const initialState: InitialState = {
  error: null,
  loading: false,
  searchUser: null
};

const searchSlice = createSlice({
  name: modulePrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUserAccount, (state, action) => {
        state.searchUser = action.payload;
        state.error = null;
      })
      .addCase(likeProfileImage.fulfilled, (state, action) => {
        const { imageId, userId } = action.payload;

        if (!state.searchUser?.images) {
          return;
        }

        const imageIndex = state.searchUser.images.findIndex(
          (el) => el.id === imageId
        );

        if (imageIndex < 0) {
          return;
        }

        const modifiedImageLikes = state.searchUser.images[imageIndex].like;
        const existLikeIndex = modifiedImageLikes.findIndex(
          (el) => el.userId === userId
        );

        if (existLikeIndex < 0) {
          state.searchUser.images[imageIndex].like = [
            ...modifiedImageLikes,
            action.payload
          ];
        } else {
          state.searchUser.images[imageIndex].like = modifiedImageLikes.filter(
            (el) => el.userId !== userId
          );
        }
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (state.searchUser) {
          state.searchUser = {
            ...state.searchUser,
            avatar: action.payload.avatar
          };
        }
      })
});

export default searchSlice;

export const searchSliceSelector = (state: AppState) => state[modulePrefix];

