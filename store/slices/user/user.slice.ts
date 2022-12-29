import { changePassword, setProfile, uploadAvatar } from "./user.actions";
import { AppState } from "./../../index";
import { userPrefix } from "./user.prefix";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

interface InitialState {
  error: SerializedError | null;
  loading: boolean;
  user: IUser | null;
}

const initialState: InitialState = {
  error: null,
  loading: false,
  user: null
};

const userSlice = createSlice({
  name: userPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(setProfile, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = { ...state.user, avatar: action.payload.avatar };
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
});

export const userSliceSelector = (state: AppState) => state[userPrefix];

export default userSlice;

