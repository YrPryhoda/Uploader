import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

import userService from "../../store/slices/user/user.service";
import { notification } from "../../lib/notifications";
import { useForm } from "../../hooks/useForm";
import styles from "./styles.module.scss";

const SignUpForm = () => {
  const router = useRouter();
  const { form, onChange } = useForm({
    email: "",
    name: "",
    password: "",
    confirmPassword: ""
  });

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !form.password.trim() ||
        form.password !== form.confirmPassword ||
        !form.email.trim() ||
        !form.name.trim()
      ) {
        return notification("error", "Invalid fieds in sign up form");
      }

      const response = await userService.signUp(form);

      if (response.errors) {
        throw Error(response.errors.toString());
      }

      notification("success", "Account has been created!");
      return router.replace("/auth/sign-in");
    } catch (error) {
      const err = error as Error;
      notification("error", err.message);
    }
  };

  return (
    <form onSubmit={handlerSubmit} className={styles.form}>
      <h2>Please Sign Up</h2>

      <label className={styles.form__field}>
        <p className={styles.form__label}>E-mail</p>
        <input
          type="email"
          required
          name="email"
          onChange={onChange}
          className={styles.form__input}
        />
      </label>
      <label className={styles.form__field}>
        <p className={styles.form__label}>Name</p>
        <input
          type="text"
          required
          name="name"
          onChange={onChange}
          className={styles.form__input}
        />
      </label>
      <label className={styles.form__field}>
        <p className={styles.form__label}>Password</p>
        <input
          type="password"
          required
          name="password"
          onChange={onChange}
          className={styles.form__input}
        />
      </label>
      <label className={styles.form__field}>
        <p className={styles.form__label}>Repeat password</p>
        <input
          type="password"
          required
          name="confirmPassword"
          onChange={onChange}
          className={styles.form__input}
        />
      </label>
      <label className={styles.form__field}>
        <button type="submit" className={styles.form__btn}>
          Login
        </button>
      </label>
      <label className={styles.form__field}>
        <p>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className={styles.form__link}>
            Sign in
          </Link>
        </p>
      </label>
    </form>
  );
};

export default SignUpForm;

