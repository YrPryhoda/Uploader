import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import {
  addImages,
  loadProfileImages
} from "../store/slices/images/images.actions";
import { imagesSliceSelector } from "../store/slices/images/images.slice";
import imagesService from "../store/slices/images/images.service";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import UploadCoordsForm from "../components/UploadCoordsForm";
import { notification } from "../lib/notifications";
import ImagesList from "../components/ImagesList";
import Pagination from "../components/Pagination";
import DropZone from "../components/DropZone";
import styles from "../styles/Home.module.css";

interface IProps {
  images: IImage[];
  total: number;
  error?: string;
}

const Home = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { error: dispatchError, images } = useAppSelector(imagesSliceSelector);
  const [modal, showModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    dispatch(loadProfileImages(props.images));
  }, [dispatch, props.images]);

  if (props.error) {
    notification("error", props.error || dispatchError?.message);
  }

  const submitHandler = async (coordinates?: IGeo) => {
    const formData = new FormData();
    selectedImages.forEach((el) => formData.append("images", el));

    if (coordinates) {
      formData.append("coordinates", JSON.stringify(coordinates));
    }

    const result = await dispatch(addImages(formData));

    if (!result.type.includes("rejected")) {
      notification("success", "Upload successfully");
      setSelectedImages([]);
      showModal(false);
    }
  };

  return (
    <div className={styles.document}>
      <div className={styles.formContainer}>
        <DropZone
          onSelect={setSelectedImages}
          images={selectedImages}
          showModal={showModal}
        />
      </div>
      <ImagesList images={images} />
      <div className={styles.paginationBlock}>
        {props.total ? (
          <Pagination total={props.total} href={"?page="} />
        ) : null}
      </div>
      {modal && (
        <UploadCoordsForm isOpen={modal} onSubmit={submitHandler} handlerClose={showModal} />
      )}
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const session = await getSession({ req: context.req });
    const id = Number(session?.user.id);
    const page = Number(context.query.page) || 1;

    if (!id) {
      return {
        props: {
          images: [],
          total: 0
        }
      };
    }

    const response = await imagesService.getUsersImages(id, page);

    return {
      props: {
        images: response.images,
        total: response.rows,
        session
      }
    };
  } catch (error: unknown) {
    console.log(error);
    const err = error as Error;

    return {
      props: {
        error: err.message
      }
    };
  }
};

export default Home;

