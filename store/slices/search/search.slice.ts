import { getUserAccount } from "./search.actions";
import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../..";
import { modulePrefix } from "./search.prefix";

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
    builder.addCase(getUserAccount, (state, action) => {
      state.searchUser = action.payload;
      state.error = null;
    })
});

export default searchSlice;

export const searchSliceSelector = (state: AppState) => state[modulePrefix];

