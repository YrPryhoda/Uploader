import Link from "next/link";
import React from "react";

import styles from "./styles.module.scss";

interface IProps {
  user: IUser;
}

const ProfileForm = ({ user }: IProps) => {
  return (
    <div className={styles.form}>
      <div className={styles.form__field}>
        <p className={styles.form__label}>You current name:</p>
        <p className={styles.form__value}>{user.name}</p>
      </div>
      <div className={styles.form__field}>
        <p className={styles.form__label}>You current email:</p>
        <p className={styles.form__value}>{user.email}</p>
      </div>
      <div className={styles.form__field}>
        <p className={styles.form__label}>
          Your profile was was updated last time:
        </p>
        <p className={styles.form__value}>
          {new Date(user.updatedAt).toLocaleString("ua-UA", { hour12: false })}
        </p>
      </div>
      <div className={styles.form__field}>
        <p className={styles.form__label}>Your profile was created:</p>
        <p className={styles.form__value}>
          {new Date(user.createdAt).toLocaleString("ua-UA", { hour12: false })}
        </p>
      </div>
      <div className={`${styles.form__field} ${styles.form_center}`}>
        <Link href={"/profile/change-password"}>
          <button className={styles.form__btn}>Change password</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileForm;

