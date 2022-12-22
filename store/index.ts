import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";

import { userPrefix as userModulePrefix } from "./slices/user/user.prefix";
import { modulePrefix as imageModulePrefix } from "./slices/images/images.prefix";
import { modulePrefix as searchModulePrefix } from "./slices/search/search.prefix";

import imagesSlice from "./slices/images/images.slice";
import userSlice from "./slices/user/user.slice";
import searchSlice from "./slices/search/search.slice";

export const store = configureStore({
  reducer: {
    [imageModulePrefix]: imagesSlice.reducer,
    [userModulePrefix]: userSlice.reducer,
    [searchModulePrefix]: searchSlice.reducer
  },
  devTools: true
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

