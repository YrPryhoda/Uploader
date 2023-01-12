import {
  loadChatWithMessages,
  sendMessage,
  changeMessagesStatus,
  startChat
} from "./chat.actions";
import { SerializedError, createSlice } from "@reduxjs/toolkit";

import { modulePrefix } from "./chat.prefix";
import { AppState } from "../..";

interface InitialState {
  error: SerializedError | null;
  loading: boolean;
  chat: IChatGeneral | null;
  messages: IMessage[] | [];
  penPal: IUser | null;
}

const initialState: InitialState = {
  error: null,
  loading: false,
  chat: null,
  messages: [],
  penPal: null
};

const chatSlice = createSlice({
  name: modulePrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadChatWithMessages, (state, action) => {
        const { createdAt, id, members, messages } = action.payload;

        state.loading = false;
        state.error = null;
        state.chat = { createdAt, id, members };
        state.messages = messages;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(changeMessagesStatus.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })
      .addCase(startChat.pending, (state) => {
        state.loading = true;
        state.chat = null;
        state.messages = [];
      })
      .addCase(startChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chat = action.payload;
      })
      .addCase(startChat.rejected, (state, action) => {
        state.error = action.error;
      })
});

export default chatSlice;

export const chatSliceSelector = (state: AppState) => state[modulePrefix];

