import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  users: IUserRating[];
}
const UserRating = ({ users }: IProps) => {
  return (
    <div className={styles.rating}>
      {users.map((user, index) => {
        return (
          <div key={user.id} className={styles.rating__user}>
            <Link href={`/user/${user.id}`}>
              <div className={styles.rating__title}>
                <div className={styles.rating__num}>{index + 1}</div>
                <Image
                  alt={user.name}
                  src={
                    user.avatar ? `/${user.id}/${user.avatar}` : "/profile.svg"
                  }
                  width={64}
                  height={64}
									className={styles.rating__avatar}
                />
                <h3 className={styles.rating__name}>{user.name}</h3>
              </div>
            </Link>
            <div className={styles.rating__likes}>
              <p> {user._likesCount} Likes</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserRating;

