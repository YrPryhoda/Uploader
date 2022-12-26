import { GetStaticProps } from "next";
import React from "react";

import { notification } from "../../lib/notifications";
import BackBtn from "../../components/common/BackBtn";
import UserRating from "../../components/UserRating";
import styles from "../../styles/Page.module.css";

interface IProps {
  users: IUserRating[];
}

const UsersRatingPage = ({ users }: IProps) => {
  return (
    <div className={styles.document}>
      <div className={styles.backWrapper}>
        <BackBtn />
      </div>
      <UserRating users={users} />
    </div>
  );
};

export default UsersRatingPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const day = 3600 * 24;
    const response = await fetch(`${process.env.ABS_URL}/api/user/rating`);
    const users = await response.json();

    return {
      revalidate: day,
      props: {
        users
      }
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err);
    notification("error", err.message);
    return {
      props: {
        users: []
      }
    };
  }
};

