import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ImagesList from "../../components/ImagesList";
import Pagination from "../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadGalleryPerPage } from "../../store/slices/images/images.actions";
import { imagesSliceSelector } from "../../store/slices/images/images.slice";
import styles from "../../styles/Page.module.css";

interface IProps {
  images: IImage[];
  rows: number;
}

const Images = ({ images, rows }: IProps) => {
  const dispatch = useAppDispatch();
  const { gallery, galleryTotal } = useAppSelector(imagesSliceSelector);
	
  useEffect(() => {
    dispatch(loadGalleryPerPage({ gallery: images, total: rows }));
  }, [dispatch, images, rows]);

  return (
    <div className={styles.document}>
      <h2>Images Gallery</h2>
      {images.length ? <p>We have for you {galleryTotal} pictures</p> : null}

      <ImagesList images={gallery} />
      <Pagination total={galleryTotal} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { page } = context.query;

    const response = await fetch(
      `${process.env.ABS_URL}/api/image?page=${page}`
    );
    const { rows, images } = await response.json();

    if (rows && !images.length) {
      return {
        redirect: {
          destination: "/images/1",
          permanent: false
        }
      };
    }

    return {
      props: {
        images,
        rows
      }
    };
  } catch (error) {
    return {
      props: {
        images: []
      }
    };
  }
};

export default Images;

