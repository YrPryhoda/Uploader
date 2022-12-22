import { notification } from "./../../../lib/notifications";

class UserService {
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
}

export default new UserService();

