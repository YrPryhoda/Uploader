import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

import {
  deleteImage,
  likeImage
} from "../../store/slices/images/images.actions";
import { generateImagePath } from "../../lib/image/generateImagePath";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { notification } from "../../lib/notifications";
import styles from "./styles.module.scss";
import Spinner from "../Spinner";

interface IProps {
  images: IImage[];
  onImgClick?: (arg: IImage) => void;
}

const ImagesList = ({ images, onImgClick }: IProps) => {
  const { data } = useSession();

  const { deleteLoading } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();

  const handlerLike = (imageId: number) => {
    const userId = data?.user.id;
    if (!userId) {
      notification("info", "Please sign in to leave reactions");
      return;
    }

    dispatch(likeImage({ imageId }));
  };

  const handlerDeleteById = (id: number) => {
    dispatch(deleteImage(id)).then(() => {
      notification("info", "Deleted successfully");
    });
  };

  if (deleteLoading) {
    return (
      <section className={styles.imagesBlock}>
        <Spinner />
      </section>
    );
  }

  if (!images || !images.length) {
    return (
      <section className={styles.imagesBlock}>
        <div className={styles.empty}>Images not found </div>
      </section>
    );
  }

  const deleteBtnJSX = (imgId: number, userId: number) => {
    return data?.user.id && Number(data?.user.id) === userId ? (
      <button
        className={styles.imgCard__remove}
        onClick={() => handlerDeleteById(imgId)}
      />
    ) : null;
  };

  const likeCount = (el: IImage) =>
    el.like.length ? Number(el.like.length) : null;

  return (
    <section className={styles.imagesBlock}>
      {images.map((el) => {
        const path = generateImagePath(el);

        return (
          <div key={el.id} className={styles.imgCard}>
            <Image
              onClick={() => (onImgClick ? onImgClick(el) : null)}
              loader={path.loader}
              src={path.src}
              alt={el.title}
              width={200}
              height={200}
              className={styles.imgCard__img}
            />
            <div className={styles.imgCard__details}>
              <div className={styles.imgCard__like}>
                <Image
                  src={"/like-icon.svg"}
                  alt={"like it!"}
                  width={38}
                  height={38}
                  onClick={() => handlerLike(el.id)}
                  className={styles.imgCard__like_icon}
                />
                <span className={styles.imgCard__like_count}>
                  {likeCount(el)}
                </span>
              </div>
              <span className={styles.imgCard__title}>Title: {el.title}</span>
              {deleteBtnJSX(el.id, el.userId)}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ImagesList;

