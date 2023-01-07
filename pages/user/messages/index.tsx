import { GetServerSideProps } from "next";
import React from "react";

import ChatList from "../../../components/chat/ChatList";
import styles from "../../../styles/Page.module.css";

interface IProps {
  chats: IChat[];
}

const UserMessages = ({ chats }: IProps) => {
  if (!chats || !chats.length) {
    return <p>Not Found</p>;
  }

  return (
    <div className={styles.document}>
      <ChatList chats={chats} />
    </div>
  );
};

export default UserMessages;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await fetch(`${process.env.ABS_URL}/api/chat`, {
      headers: {
        cookie: context.req.headers.cookie!
      }
    });

    const chats = await response.json();
    return {
      props: {
        chats
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        chats: []
      }
    };
  }
};

