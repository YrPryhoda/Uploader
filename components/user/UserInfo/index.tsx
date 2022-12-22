import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface IProps {
  user: IUser;
}

const UserInfo = ({ user }: IProps) => {
  const collectedLikes = () => {
    return user.images?.reduce((total, current) => {
      total += current.like.length;
      return total;
    }, 0);
  };
  const memoCollectedLikes = useMemo(collectedLikes, [user]);
  const memoCreatedDate = useMemo(
    () => new Date(user.createdAt).toLocaleDateString(),
    [user]
  );

  return (
    <div className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__avatar}>
          <Image
            alt={`${user.name} avatar`}
            src={`/profile.svg`}
            width={196}
            height={196}
          />
        </div>
        <div className={styles.header__info}>
          <h2 className={styles.header__title}>{user.name}</h2>
          <p className={styles.header__details}>
            Images uploaded: {user.images?.length}
          </p>
          <p className={styles.header__details}>
            Liked other users images: {user.likes?.length} times
          </p>
          <p className={styles.header__details}>
            Collected likes: {memoCollectedLikes}
          </p>
          <p className={styles.header__details}>
            Contact address: {user.email}
          </p>
          <p className={styles.header__details}>
            On platform since: {memoCreatedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

