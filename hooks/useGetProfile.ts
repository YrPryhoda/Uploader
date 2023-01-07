import { useSession } from "next-auth/react";

import { setProfile } from "./../store/slices/user/user.actions";
import { userSliceSelector } from "./../store/slices/user/user.slice";
import { useAppSelector, useAppDispatch } from "./../store/hooks";
import userService from "../store/slices/user/user.service";

export const useGetProfile = () => {
  const selector = useAppSelector(userSliceSelector);
  const dispatch = useAppDispatch();
  const session = useSession();

  if (session.status === "unauthenticated") {
    return { error: "Unauthenticated" };
  }

  if (!selector.user) {
    if (session.status === "loading") {
      return;
    }

    const id = session.data!.user.id!;
    userService.profile().then((user) => {
      dispatch(setProfile(user));
    });
  }

  return {
    error: null
  };
};

