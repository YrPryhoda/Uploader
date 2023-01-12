import React from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { userSliceSelector } from "../../../store/slices/user/user.slice";
import { formatDate } from "../../../lib/formatDate";
import styles from "./styles.module.scss";
import Avatar from "../../common/Avatar";

interface IProps {
  chat: IChat;
}

const ChatListItem = ({ chat }: IProps) => {
  const { data } = useSession();
  const penFriend = chat.members.filter(
    (el) => el.id !== Number(data?.user.id)
  );
  const message = chat.messages[0];

  const { user } = useSelector(userSliceSelector);
  const isNewMessage =
    message && user?.messageNotification?.some((el) => el.id === message.id);

  return (
    <div className={styles.item}>
      <Link href={`/user/${penFriend[0].id}`}>
        <div className={styles.item__user}>
          <Avatar user={penFriend[0]} />
        </div>
      </Link>
      <Link
        className={styles.item__content}
        href={`/user/messages/chat/${chat.id}`}
      >
        <h3 className={styles.item__title}>{penFriend[0].name}</h3>
        {chat.messages.length ? (
          <div
            className={`${styles.item__message} ${
              !!isNewMessage ? styles.item__newMessage : ""
            }`}
          >
            <p className={styles.item__text}>
              <span className={styles.item__subtitle}>
                {message.author!.name}:
              </span>
              {message.text}
            </p>

            <span className={styles.item__date}>
              {formatDate(message.createdAt)}
            </span>
          </div>
        ) : (
          <p>Chat is empty</p>
        )}
      </Link>
    </div>
  );
};

export default ChatListItem;

