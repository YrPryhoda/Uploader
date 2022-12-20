import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import SignInForm from "../../components/SignIn";
import styles from "../../styles/Auth.module.css";

const signIn = () => {
  return (
    <div className={styles.document}>
      <SignInForm />
    </div>
  );
};

export default signIn;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
