import React from "react";
import Image from "next/image";

import { generateImagePath } from "../../../lib/image/generateImagePath";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";

interface IProps {
  image: IImage;
}

const ImageCard = ({ image }: IProps) => {
  const path = generateImagePath(image);
  const { data, status } = useSession();
  const owner = image.user?.id;

  return (
    <div className={styles.container}>
      <div key={image.id} className={styles.card}>
        <Image
          alt={image.title}
          src={path.src}
          loader={path.loader}
          width={400}
          height={300}
          className={styles.card__img}
        />
        <div className={styles.card__info}>
          <Image
            alt={"Like it"}
            src={"/like-icon.svg"}
            width={32}
            height={32}
            className={styles.card__like}
          />
          <p>{image.like ? image.like.length : null}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

