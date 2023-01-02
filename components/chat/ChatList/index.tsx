import React from "react";
import styles from "./styles.module.scss";
import ChatItem from "../ChatItem";

interface IProps {
  chats: IChat[];
}

const ChatList = ({ chats }: IProps) => {
  return (
    <div>
      {chats.map((el) => {
        return <ChatItem key={el.id} chat={el} />;
      })}
    </div>
  );
};

export default ChatList;

