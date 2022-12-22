import React from "react";

import styles from "./styles.module.scss";
import ImageCard from "../../common/ImageCard";

interface IProps {
  user: IUser;
}

const UserGallery = ({ user }: IProps) => {
  return user.images?.length ? (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>User gallery</h2>
      <div className={styles.container}>
        {user.images.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.empty}>
      <h3>No images posted yet</h3>
    </div>
  );
};

export default UserGallery;

