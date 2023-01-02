import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

interface IProps {
  user: IUser;
}

const Avatar = ({ user }: IProps) => {
  return (
    <div className={styles.avatar}>
      <Image
        width={48}
        height={48}
        className={styles.avatar__image}
        alt={user.name}
        src={user.avatar ? `/${user.id}/${user.avatar}` : "/profile.svg"}
      />
    </div>
  );
};

export default Avatar;

