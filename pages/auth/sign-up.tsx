import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import SignUpForm from "../../components/SignUp";

import styles from "../../styles/Auth.module.css";

const SignUp = () => {
  return (
    <div className={styles.document}>
      <SignUpForm />
    </div>
  );
};

export default SignUp;

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

