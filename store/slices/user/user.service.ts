import { notification } from "./../../../lib/notifications";

class UserService {
  async profile() {
    try {
      const response = await fetch(`/api/user/profile`);
      return await response.json();
    } catch (error) {
      const err = error as Error;
      notification("error", err.message);
    }
  }

  async getById(id: string) {
    try {
      const response = await fetch(`/api/user/${id}`);
      return await response.json();
    } catch (error) {
      const err = error as Error;
      notification("error", err.message);
    }
  }

  async signUp(userInput: IUserInput) {
    try {
      const response = await fetch(`/api/user/sign-up`, {
        method: "POST",
        body: JSON.stringify(userInput),
        headers: {
          "Content-Type": "application/json"
        }
      });
      return await response.json();
    } catch (error) {
      const err = error as Error;
      notification("error", err.message);
    }
  }

  async updatePassword(passInput: IPasswordInput) {
    try {
      const response = await fetch(`/api/user/change-password`, {
        method: "POST",
        body: JSON.stringify(passInput),
        headers: {
          "Content-Type": "application/json"
        }
      });
      return await response.json();
    } catch (error) {
      const err = error as Error;
      notification("error", err.message);
    }
  }

  async getUserProfile(userId: number) {
    try {
      const response = await fetch(`${process.env.ABS_URL}/api/user/${userId}`);

      if (!response.ok) {
        throw Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      const err = error as Error;
      notification("error", err.message);
      return null;
    }
  }

  async uploadAvatar(avatar: FormData) {
    try {
      const response = await fetch(`/api/upload/avatar`, {
        method: "POST",
        credentials: "include",
        body: avatar
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return await response.json();
    } catch (error) {
      const err = error as Error;
      notification("error", err.message);
      throw Error(err.message);
    }
  }
}

export default new UserService();

