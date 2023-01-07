import React from "react";
import ChatListItem from "../ChatListItem";

interface IProps {
  chats: IChat[];
}

const ChatList = ({ chats }: IProps) => {
  return (
    <div>
      {chats.map((el) => {
        return <ChatListItem key={el.id} chat={el} />;
      })}
    </div>
  );
};

export default ChatList;

