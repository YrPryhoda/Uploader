import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "../../hooks/useForm";
import { notification } from "../../lib/notifications";
import styles from "./styles.module.scss";

const SignInForm = () => {
  const router = useRouter();
  const { form, onChange } = useForm({
    email: "",
    password: ""
  });

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false
      });

      if (response?.error) {
        throw new Error("Invalid credentials");
      }

      return router.replace("/");
    } catch (error) {
      const err = error as Error;
      notification("error", err.message);
    }
  };

  return (
    <form onSubmit={handlerSubmit} className={styles.form}>
      <h2>Please Sign In</h2>

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
        <button type="submit" className={styles.form__btn}>
          Login
        </button>
      </label>
      <label className={styles.form__field}>
        <p>
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/sign-up" className={styles.form__link}>
            Create new account
          </Link>
        </p>
      </label>
    </form>
  );
};

export default SignInForm;

