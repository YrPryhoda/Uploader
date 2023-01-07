import { useSession } from "next-auth/react";
import React from "react";

import { formatDate } from "../../../lib/formatDate";
import styles from "./styles.module.scss";
import Avatar from "../../common/Avatar";

interface IProps {
  message: IMessage;
}

const ChatThreadItem = ({ message }: IProps) => {
  const { data } = useSession();
  const isMyMessage = message.authorId === Number(data?.user.id);
  const msgStyles = `${styles.message} ${isMyMessage ? styles.reverse : ""}`;
  const newMessageStyles = message.status === "new" ? styles.new : "";

  return (
    <div className={`${msgStyles} ${newMessageStyles}`}>
      <div className={styles.message__author}>
        <Avatar user={message.author!} />
      </div>
      <div
        className={`${styles.message__content} ${
          isMyMessage ? styles.order_reverse : ""
        }`}
      >
        <h4 className={styles.message__title}>{message.author!.name}</h4>
        <p className={styles.message__text}>{message.text}</p>
        <p className={isMyMessage ? styles.date_reverse : styles.message__date}>
          {formatDate(message.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ChatThreadItem;

