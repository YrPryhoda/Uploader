import React, { useEffect, useMemo } from "react";
import { GetServerSideProps } from "next";

import {
  changeMessagesStatus,
  deleteChatNotifications,
  loadChatWithMessages,
  sendMessage
} from "../../../../store/slices/chat/chat.actions";
import { userSliceSelector } from "../../../../store/slices/user/user.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import ChatThread from "../../../../components/chat/ChatThread";
import ChatInput from "../../../../components/chat/ChatInput";
import styles from "../../../../styles/Page.module.css";
import Spinner from "../../../../components/Spinner";
import { chatSliceSelector } from "../../../../store/slices/chat/chat.slice";
import { notification } from "../../../../lib/notifications";
import Link from "next/link";

interface IProps {
  chat: IChat;
}

const Chat = ({ chat }: IProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSliceSelector);
  const {
    loading,
    error,
    chat: appChat,
    messages
  } = useAppSelector(chatSliceSelector);

  const penPal = useMemo(() => {
    const reciever = appChat?.members.filter((el) => el.id !== user?.id);
    if (!reciever) {
      return;
    }

    return reciever[0];
  }, [appChat, user]);

  useEffect(() => {
    if (user) {
      dispatch(deleteChatNotifications({ chatId: chat.id, userId: user.id }));
    }
  }, [chat]);

  useEffect(() => {
    dispatch(changeMessagesStatus(chat.id));
  }, [dispatch, chat.id]);

  useEffect(() => {
    dispatch(loadChatWithMessages(chat));
  }, [dispatch, chat]);

  const send = (data: { text: string }) => {
    const reciever = appChat!.members.filter((el) => el.id !== user!.id);

    if (!reciever || !reciever.length) {
      notification("error", "Some error happened");
      return;
    }

    const message: IMessageInput = {
      ...data,
      authorId: user!.id,
      recieverId: reciever[0].id,
      chatId: chat.id
    };
    dispatch(sendMessage(message));
  };

  if (!user || !appChat) {
    return <Spinner />;
  }

  return (
    <div className={styles.document}>
      <Link href={`/user/${penPal?.id}`}>
        <h4>{penPal?.name}</h4>
      </Link>
      <ChatThread chat={appChat} messages={messages} />
      <ChatInput user={user} onSend={send} loading={loading} />
    </div>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = Number(context.query.id);
    const response = await fetch(`${process.env.ABS_URL}/api/chat/${id}`, {
      headers: {
        cookie: context.req.headers.cookie!
      }
    });

    if (!response.ok) {
      throw Error("Some error");
    }

    const chat = await response.json();

    return {
      props: {
        chat
      }
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true
    };
  }
};

