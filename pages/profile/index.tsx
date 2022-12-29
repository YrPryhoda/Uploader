import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

import ProfileForm from "../../components/ProfileForm";
import styles from "../../styles/Page.module.css";

interface IProps {
  user: IUser;
}

const Profile = ({ user }: IProps) => {
  const router = useRouter();
  const handlerProfileView = () => {
    router.push(`/user/${user.id}`);
  };
  return (
    <div className={styles.document}>
      <h2>Hello, {user.name}</h2>
      <button onClick={handlerProfileView} className={styles.btn}>
        Show in geleral view
      </button>
      <ProfileForm user={user} />
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false
      }
    };
  }

  const id = session.user.id;
  const response = await fetch(`${process.env.ABS_URL}/api/user/${id}`, {
    credentials: "same-origin",
    headers: {
      cookie: context.req.headers.cookie!
    }
  });

  const user = await response.json();

  if (!user) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false
      }
    };
  }

  return {
    props: { user }
  };
};

