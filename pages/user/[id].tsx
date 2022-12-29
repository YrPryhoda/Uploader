import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";

import { searchSliceSelector } from "../../store/slices/search/search.slice";
import { getUserAccount } from "../../store/slices/search/search.actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import userService from "../../store/slices/user/user.service";
import UserGallery from "../../components/user/UserGallery";
import UserInfo from "../../components/user/UserInfo";
import styles from "../../styles/Page.module.css";
import Spinner from "../../components/Spinner";

interface IProps {
  user: IUser;
}

const UserProfile = ({ user }: IProps) => {
  const dispatch = useAppDispatch();
  const { searchUser } = useAppSelector(searchSliceSelector);
  const { status } = useSession();

  useEffect(() => {
    dispatch(getUserAccount(user));
  }, [dispatch, user]);

  if (!searchUser || status === "loading") {
    return <Spinner />;
  }

  return (
    <div className={styles.document}>
      <UserInfo user={searchUser} />
      <UserGallery user={searchUser} />
    </div>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const userId = context.query.id;
    const user = await userService.getUserProfile(Number(userId));

    if (!user) {
      throw Error("Not found");
    }

    return {
      props: {
        user
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

