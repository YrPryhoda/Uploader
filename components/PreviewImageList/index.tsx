import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";

interface IProps {
  images: File[];
  warning?: boolean;
}

const PreviewImagesList = ({ images, warning }: IProps) => {
  if (warning) {
    return (
      <section className={styles.imagesBlock}>
        <h4 className={styles.loadWarning}>
          You can upload ONLY images. Besides, no more then 5 files per time
        </h4>
      </section>
    );
  }

  if (!images || !images.length) {
    return (
      <section className={styles.imagesBlock}>
        <p>No images upload yet </p>
      </section>
    );
  }

  const renderFilesPreview = () => {
    const setName = (name: string) => {
      const len = 18;
      if (name.length < len) {
        return name;
      }

      return name.substring(0, len).replace(/.$/, "...");
    };

    return (
      <ul className={styles.imgList}>
        {images.map((el) => {
          const imgSrc = URL.createObjectURL(el);

          return (
            <li key={el.name} className={styles.imgList__item}>
              <Image
                src={imgSrc}
                alt={el.name}
                width={64}
                height={64}
                className={styles.imgList__img}
              />
              <span> {setName(el.name)} </span>
              <span> {el.size} Bytes</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section className={styles.imagesBlock}>{renderFilesPreview()}</section>
  );
};

export default PreviewImagesList;

