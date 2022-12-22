import { createAction } from "@reduxjs/toolkit";
import { modulePrefix } from "./search.prefix";

export const getUserAccount = createAction<IUser>(
  `${modulePrefix}/user-account`
);
