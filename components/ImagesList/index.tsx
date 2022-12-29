import React from "react";

import { likeImage } from "../../store/slices/images/images.actions";
import { useAppSelector } from "../../store/hooks";
import ImageCard from "../common/ImageCard";
import styles from "./styles.module.scss";
import Spinner from "../Spinner";

interface IProps {
  images: IImage[];
  onImgClick?: (arg: IImage) => void;
}

const ImagesList = ({ images, onImgClick }: IProps) => {
  const { deleteLoading } = useAppSelector((state) => state.images);

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

  return (
    <section className={styles.imagesBlock}>
      {images.map((el) => {
        return (
          <ImageCard
            key={el.id}
            image={el}
            handlerClick={onImgClick}
            onLike={likeImage}
          />
        );
      })}
    </section>
  );
};

export default ImagesList;

