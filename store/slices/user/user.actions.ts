import { notification } from "./../../../lib/notifications";
import { userPrefix } from "./user.prefix";
import {
  createAction,
  createAsyncThunk,
  SerializedError
} from "@reduxjs/toolkit";
import userService from "./user.service";

export const setProfile = createAction<IUser>(`${userPrefix}/set-profile`);

export const changePassword = createAsyncThunk<IUser, IPasswordInput>(
  `${userPrefix}/cnahge-password`,
  async (body, options) => {
    try {
      const res = await userService.updatePassword(body);
      notification("success", "Password updated successfully");
      return res;
    } catch (error: unknown) {
      console.log(error, "ERROR");
      throw options.rejectWithValue({ error: error as SerializedError });
    }
  }
);

