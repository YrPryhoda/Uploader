import {
  SerializedError,
  createAction,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { modulePrefix } from "./chat.prefix";
import chatService from "./chat.service";

export const loadChatWithMessages = createAction<IChat>(
  `${modulePrefix}/load-chat-messages`
);

export const sendMessage = createAsyncThunk<IChat, IMessageInput>(
  `${modulePrefix}/send-message`,
  async (msg, options) => {
    try {
      const updatedChat = await chatService.sendMessage(msg);
      return updatedChat;
    } catch (error) {
      console.log(error, "ERROR");
      throw options.rejectWithValue({ error: error as SerializedError });
    }
  }
);

export const changeMessagesStatus = createAsyncThunk<IChat, number>(
  `${modulePrefix}/messages-status`,
  async (chatId, options) => {
    try {
      const updatedChat = await chatService.updateChatMessages(chatId);
      return updatedChat;
    } catch (error) {
      console.log(error, "ERROR");
      throw options.rejectWithValue({ error: error as SerializedError });
    }
  }
);

export const deleteChatNotifications = createAsyncThunk<
  { chatId: number },
  { chatId: number; userId: number }
>(`${modulePrefix}/delete-chat-notifications`, async (idx, options) => {
  try {
    const notifications = await chatService.deleteChatNotifications(
      idx.chatId,
      idx.userId
    );
    console.log(notifications);

    return { chatId: idx.chatId };
  } catch (error) {
    console.log(error, "ERROR");
    throw options.rejectWithValue({ error: error as SerializedError });
  }
});

export const startChat = createAsyncThunk<IChat, number>(
  `${modulePrefix}/start-chat`,
  async (userId, options) => {
    try {
      const chat = await chatService.getChat(userId);
      return chat;
    } catch (error) {
      console.log(error, "ERROR");
      throw options.rejectWithValue({ error: error as SerializedError });
    }
  }
);

