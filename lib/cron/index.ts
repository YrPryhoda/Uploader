import { dailyUserRating } from "./daily.user.rating";

export const cronRegister = () => {
  dailyUserRating.start();
};

