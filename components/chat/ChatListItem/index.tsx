import React from "react";
import styles from "./styles.module.scss";
import Avatar from "../../common/Avatar";
import { useSession } from "next-auth/react";
import { formatDate } from "../../../lib/formatDate";
import Link from "next/link";

interface IProps {
  chat: IChat;
}

const ChatListItem = ({ chat }: IProps) => {
  const { data } = useSession();
  const penFriend = chat.members.filter(
    (el) => el.id !== Number(data?.user.id)
  );
  const message = chat.messages[0];

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
          <div className={styles.item__message}>
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

