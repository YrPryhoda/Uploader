import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import styles from "./styles.module.scss";
import ChatThreadItem from "../ChatThreadItem";

interface IProps {
  chat: IChatGeneral;
  messages: IMessage[];
}

const ChatThread = ({ messages }: IProps) => {
  return (
    <ScrollToBottom className={styles.container}>
      <div className={styles.messages}>
        {messages.map((el) => (
          <ChatThreadItem key={el.id} message={el} />
        ))}
      </div>
    </ScrollToBottom>
  );
};

export default ChatThread;

