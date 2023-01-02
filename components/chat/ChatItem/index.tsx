import React from "react";
import styles from "./styles.module.scss";
import Avatar from "../../common/Avatar";
import { useSession } from "next-auth/react";

interface IProps {
  chat: IChat;
}
const ChatItem = ({ chat }: IProps) => {
  const { data } = useSession();
  const penFriend = chat.members.filter(
    (el) => el.id !== Number(data?.user.id)
  );
  console.log(chat.messages);
  return (
    <div className={styles.item}>
      <div className={styles.item__user}>
        <h3>{penFriend[0].name}</h3>
      </div>
      <div className={styles.item__content}>
         <p>{chat.messages[0].text}</p>
      </div>
    </div>
  );
};

export default ChatItem;

