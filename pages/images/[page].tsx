import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { loadGalleryPerPage } from "../../store/slices/images/images.actions";
import { imagesSliceSelector } from "../../store/slices/images/images.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ImageMapLocation from "../../components/ImageMapLocation";
import { notification } from "../../lib/notifications";
import ImagesList from "../../components/ImagesList";
import Pagination from "../../components/Pagination";
import styles from "../../styles/Page.module.css";

interface IProps {
  images: IImage[];
  rows: number;
}

const Images = ({ images, rows }: IProps) => {
  const dispatch = useAppDispatch();
  const { images: storeImages, galleryTotal } =
    useAppSelector(imagesSliceSelector);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);

  useEffect(() => {
    dispatch(loadGalleryPerPage({ images, total: rows }));
  }, [dispatch, images, rows]);

  const handlerImageClick = (img: IImage) => {
    if (!img.lat || !img.lng) {
      return notification("info", "Location not found");
    }

    setSelectedImage(img);
  };
  const handlerModalClose = () => {
    setSelectedImage(null);
  };

  const renderSelectedImgLocation = selectedImage ? (
    <ImageMapLocation
      geo={{ lat: selectedImage.lat!, lng: selectedImage.lng! }}
      isOpen={!!selectedImage}
      onClose={handlerModalClose}
    />
  ) : null;

  return (
    <div className={styles.document}>
      <nav className={styles.subNav}>
        <Link href={"/images/rating"} className={styles.subNav__link}>
          Images Rating
        </Link>
        <Link href={"/user/rating"} className={styles.subNav__link}>
          Users Rating
        </Link>
      </nav>
      <h2>Images Gallery</h2>
      {images.length ? (
        <p>
          We have <b>{galleryTotal}</b> pictures for you
        </p>
      ) : null}

      <ImagesList images={storeImages} onImgClick={handlerImageClick} />
      {rows ? <Pagination total={galleryTotal} href={"/images/"} /> : null}
      {renderSelectedImgLocation}
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

