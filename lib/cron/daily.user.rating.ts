import { CronJob } from "cron";

export const dailyUserRating = new CronJob(
  "* * */12 * * *",
  () => console.log("CRON"),
  null,
  false
);

