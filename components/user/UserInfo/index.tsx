import React, { useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { uploadAvatar } from "../../../store/slices/user/user.actions";
import Link from "next/link";
import { startChat } from "../../../store/slices/chat/chat.actions";
import { chatSliceSelector } from "../../../store/slices/chat/chat.slice";
import { notification } from "../../../lib/notifications";

interface IProps {
  user: IUser;
}

const UserInfo = ({ user }: IProps) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const { data, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(chatSliceSelector);

  const handlerSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      dispatch(uploadAvatar(formData));
    }
  };

  const handlerOpenChat = () => {
    dispatch(startChat(user.id)).then((data) => {
      if (data.meta.requestStatus === "fulfilled") {
        const chat = data.payload as IChat;
        if (chat.id) {
          router.push(`/user/messages/chat/${chat.id}`);
        }
      } else {
        notification("error", "Some error happened");
      }
    });
  };

  const handlerUploadClick = () => {
    inputFile.current?.click();
  };

  const collectedLikes = () => {
    return user.images?.reduce((total, current) => {
      total += current.like.length;
      return total;
    }, 0);
  };
  const memoCollectedLikes = useMemo(collectedLikes, [user]);
  const memoCreatedDate = useMemo(
    () => new Date(user.createdAt).toLocaleDateString(),
    [user]
  );

  const renderUploadAvatarJSX =
    status === "authenticated" && router.query.id === data.user.id ? (
      <div className={styles.header__uploadWrapper}>
        <button onClick={handlerUploadClick} className={styles.header__upload}>
          Change avatar
        </button>
        <input
          ref={inputFile}
          type={"file"}
          accept="image/*"
          onChange={handlerSelectAvatar}
          className={styles.header__inputFile}
        />
      </div>
    ) : null;

  return (
    <div className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__avatarWrapper}>
          {user.avatar ? (
            <Image
              alt={`${user.name} avatar`}
              src={`/${user.id}/${user.avatar}`}
              width={196}
              height={196}
              className={styles.header__avatarPreview}
            />
          ) : (
            <div className={styles.header__avatar}>
              <Image
                alt={`${user.name} avatar`}
                src={`/profile.svg`}
                width={196}
                height={196}
              />
            </div>
          )}
          {renderUploadAvatarJSX}
        </div>

        <div className={styles.header__info}>
          <h2 className={styles.header__title}>{user.name}</h2>
          <p className={styles.header__details}>
            Images uploaded: {user.images?.length}
          </p>
          <p className={styles.header__details}>
            Liked other users images: {user.likes?.length} times
          </p>
          <p className={styles.header__details}>
            Collected likes: {memoCollectedLikes}
          </p>
          <p className={styles.header__details}>
            Contact address: {user.email}
          </p>
          <p className={styles.header__details}>
            On platform since: {memoCreatedDate}
          </p>
          <button onClick={handlerOpenChat}>
            {loading ? "Loading" : "Send message"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

