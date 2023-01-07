class ChatService {
	async getChat(userId: number) {
		try {
      const response = await fetch(`/api/chat/get-chat/${userId}`);

      if (!response.ok) {
        console.log(response.statusText);
        throw Error("Fetch error");
      }

      return await response.json();
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err);
      throw new Error(err.message);
    }
	}

  async sendMessage(message: IMessageInput) {
    try {
      const response = await fetch("/api/chat/create-message", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        console.log(response.statusText);
        throw Error("Fetch error");
      }

      return await response.json();
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err);
      throw new Error(err.message);
    }
  }

  async updateChatMessages(chatId: number) {
    try {
      const response = await fetch(`/api/chat/update-chat-messages/${chatId}`);

      if (!response.ok) {
        console.log(response.statusText);
        throw Error("Fetch error");
      }

      return await response.json();
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err);
      throw new Error(err.message);
    }
  }

  async deleteChatNotifications(chatId: number, userId: number) {
    try {
      const response = await fetch(
        `/api/chat/delete-chat-notifications/${userId}/${chatId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        console.log(response.statusText);
        throw Error("Fetch error");
      }

      return await response.json();
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err);
      throw new Error(err.message);
    }
  }
}

export default new ChatService();

