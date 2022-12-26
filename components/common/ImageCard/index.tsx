import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

import {
  deleteImage,
  likeImage
} from "../../../store/slices/images/images.actions";
import { generateImagePath } from "../../../lib/image/generateImagePath";
import { notification } from "../../../lib/notifications";
import { useAppDispatch } from "../../../store/hooks";
import styles from "./styles.module.scss";
import Link from "next/link";

interface IProps {
  image: IImage;
  handlerClick?: (arg: IImage) => void;
}

const ImageCard = ({ image, handlerClick }: IProps) => {
  const path = generateImagePath(image);
  const { data, status } = useSession();
  const dispatch = useAppDispatch();

  const handlerDeleteById = (id: number) => {
    dispatch(deleteImage(id)).then(() => {
      notification("info", "Deleted successfully");
    });
  };

  const handlerLike = (imageId: number) => {
    const userId = data?.user.id;
    if (status === "unauthenticated" || !userId) {
      notification("info", "Please sign in to leave reactions");
      return;
    }

    dispatch(likeImage({ imageId }));
  };

  const deleteBtnJSX = (imgId: number, userId: number) => {
    return status === "authenticated" &&
      data?.user.id &&
      Number(data?.user.id) === userId ? (
      <button
        className={styles.card__remove}
        onClick={() => handlerDeleteById(imgId)}
      />
    ) : null;
  };

  const cardHeaderJSX = (image: IImage) => {
    return image.user ? (
      <Link href={`/user/${image.userId}`}>
        <div className={styles.header}>
          <div className={styles.header__user}>
            <div className={styles.header__icon}>
              <Image
                width={48}
                height={48}
                className={styles.header__avatar}
                alt={image.user.name}
                src={"/profile.svg"}
              />
            </div>
            <h5 className={styles.header__title}> {image.user?.name}</h5>
          </div>
          <div>
            <p className={styles.header__date}>
              {new Date(image.createdAt).toLocaleString("uk-UA", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
          </div>
        </div>
      </Link>
    ) : null;
  };

  return (
    <div className={styles.container}>
      <div
        key={image.id}
        className={styles.card}
        onClick={() => (handlerClick ? handlerClick(image) : null)}
      >
        {cardHeaderJSX(image)}
        <Image
          alt={image.title}
          src={path.src}
          loader={path.loader}
          priority
          width={200}
          height={200}
          className={styles.card__img}
        />
        <div className={styles.card__info}>
          <div className={styles.card__like_block}>
            <Image
              alt={"Like it"}
              src={"/like-icon.svg"}
              width={32}
              height={32}
              className={styles.card__like}
              onClick={() => handlerLike(image.id)}
            />
            <p>{image.like ? image.like.length : null}</p>
          </div>
          {deleteBtnJSX(image.id, image.userId)}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

