import { GetStaticProps } from "next";
import React, { useEffect } from "react";
import ImagesList from "../../components/ImagesList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadGalleryPerPage } from "../../store/slices/images/images.actions";
import { imagesSliceSelector } from "../../store/slices/images/images.slice";
import { useRouter } from "next/router";
interface IProps {
  ratingList: IImage[];
}
const ImageRating = ({ ratingList }: IProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { images } = useAppSelector(imagesSliceSelector);
  const handlerImageClick = (image: IImage) => {
    router.push(`/user/${image.user.id}`);
  };
  useEffect(() => {
    dispatch(
      loadGalleryPerPage({ images: ratingList, total: ratingList.length })
    );
  }, [dispatch, ratingList]);
  return <ImagesList images={images} onImgClick={handlerImageClick} />;
};

export default ImageRating;

export const getStaticProps: GetStaticProps = async (context) => {
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

