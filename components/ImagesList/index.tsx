import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteImage } from "../../store/slices/images/images.actions";
import Spinner from "../Spinner";
import { notification } from "../../lib/notifications";

interface IProps {
  images: IImage[];
}

const ImagesList = ({ images }: IProps) => {
  const { deleteLoading } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();

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
        <div className={styles.empty}>No images upload yet </div>
      </section>
    );
  }

  return (
    <section className={styles.imagesBlock}>
      {images.map((el) => {
        return (
          <div key={el.id} className={styles.imgCard}>
            <Image
              src={`/imagesDB/${el.title}`}
              alt={el.title}
              width={400}
              height={300}
              className={styles.imgCard__img}
            />
            <div className={styles.imgCard__details}>
              <span className={styles.imgCard__title}>Title: {el.title}</span>
              <button
                className={styles.imgCard__remove}
                onClick={() => handlerDeleteById(el.id)}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ImagesList;

