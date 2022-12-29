import Image from "next/image";
import React from "react";
import { generateImagePath } from "../../lib/image/generateImagePath";
import styles from "./styles.module.scss";

interface IProps {
  image: IImage | IImage[];
  onClose: () => void;
}

const ImageOverview = (props: IProps) => {
  const isArr = (arg: IImage | IImage[]): arg is IImage[] =>
    Array.isArray(props.image);

  const renderTitle = (
    <h4 className={styles.section__title}>
      With coordinates:{" "}
      {isArr(props.image) ? props.image[0].lat : props.image.lat},{" "}
      {isArr(props.image) ? props.image[0].lng : props.image.lng}
    </h4>
  );

  const renderImgJSX = (img: IImage) => {
    const imgPath = generateImagePath(img);

    return (
      <Image
        key={img.id}
        className={styles.section__img}
        src={imgPath.src}
        loader={imgPath.loader}
        alt={img.title}
        width={500}
        height={500}
      />
    );
  };

  const renderImgs = Array.isArray(props.image)
    ? props.image.map((el) => renderImgJSX(el))
    : renderImgJSX(props.image);

  return (
    <div className={styles.section}>
      <button className={styles.section__close} onClick={props.onClose}>
        Close
      </button>
      {renderTitle}
      <div className={styles.section__wrapper}>{renderImgs}</div>
    </div>
  );
};

export default ImageOverview;

