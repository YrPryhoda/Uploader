import { GetStaticProps } from "next";
import React, { useEffect } from "react";

import {
  likeImage,
  loadGalleryPerPage
} from "../../store/slices/images/images.actions";
import { imagesSliceSelector } from "../../store/slices/images/images.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ImageCard from "../../components/common/ImageCard";
import BackBtn from "../../components/common/BackBtn";
import styles from "../../styles/Page.module.css";
interface IProps {
  ratingList: IImage[];
}
const ImageRating = ({ ratingList }: IProps) => {
  const dispatch = useAppDispatch();
  const { images } = useAppSelector(imagesSliceSelector);

  useEffect(() => {
    dispatch(
      loadGalleryPerPage({ images: ratingList, total: ratingList.length })
    );
  }, [dispatch, ratingList]);

  return (
    <div>
      <BackBtn />
      <div>
        <h2 className={styles.title}>Top 10 images rating</h2>
      </div>
      <div className={styles.grid_container}>
        {images.map((image) => {
          return (
            <ImageCard
              key={image.id}
              image={image}
              onLike={likeImage}
              handlerClick={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageRating;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.ABS_URL}/api/reaction/rating`);
    const ratingList = await response.json();

    return {
      props: {
        ratingList
      },
      revalidate: 60
    };
  } catch (error) {
    console.log(error);
    return {
      props: {}
    };
  }
};

