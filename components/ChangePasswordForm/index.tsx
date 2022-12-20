import { useRouter } from "next/router";
import React from "react";

import { changePassword } from "../../store/slices/user/user.actions";
import { userSliceSelector } from "../../store/slices/user/user.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { notification } from "../../lib/notifications";
import { useForm } from "../../hooks/useForm";
import styles from "./styles.module.scss";

const ChangePasswordForm = () => {
  const { loading } = useAppSelector(userSliceSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { form, onChange, resetForm } = useForm({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const handlerBackClick = () => {
    router.back();
  };

  const handlerConfirm = () => {
    const { oldPassword, newPassword, confirmNewPassword } = form;

    if (
      !oldPassword ||
      newPassword.trim().length < 6 ||
      newPassword.trim() !== confirmNewPassword.trim()
    ) {
      return notification("warning", "Please fill in all field correct");
    }

    dispatch(changePassword(form)).then(() => {
      resetForm();
    });
  };

  if (loading) {
    return <p> Loading ...</p>;
  }

  return (
    <div className={styles.form}>
      <div className={styles.form__field}>
        <p className={styles.form__label}>Enter current password:</p>
        <input
          type="password"
          className={styles.form__value}
          name="oldPassword"
          value={form.oldPassword}
          onChange={onChange}
        />
      </div>
      <div className={styles.form__field}>
        <p className={styles.form__label}>Enter new password:</p>
        <input
          type="password"
          className={styles.form__value}
          name="newPassword"
          value={form.newPassword}
          onChange={onChange}
        />
        <p className={styles.form__subtext}>
          Password must consist at least 6 symbols
        </p>
      </div>
      <div className={styles.form__field}>
        <p className={styles.form__label}>Confirm new password:</p>
        <input
          type="password"
          className={styles.form__value}
          name="confirmNewPassword"
          value={form.confirmNewPassword}
          onChange={onChange}
        />
      </div>

      <div className={`${styles.form__field} ${styles.form_center}`}>
        <button onClick={handlerConfirm} className={styles.form__btn}>
          Confirm
        </button>
        <button
          onClick={handlerBackClick}
          className={`${styles.form__btn} ${styles.form__back}`}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

