import React, { Fragment, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { notification } from "../../lib/notifications";
import PreviewImagesList from "../PreviewImageList";
import { useAppSelector } from "../../store/hooks";
import styles from "./styles.module.scss";
import Spinner from "../Spinner";

interface IProps {
  showModal: (arg: boolean) => void;
  onSelect: React.Dispatch<React.SetStateAction<File[]>>;
  images: File[];
}

const MAX_FILES_COUNT = 5;

const DropZone = (props: IProps) => {
  const { loading } = useAppSelector((state) => state.images);
  const inputFile = useRef<HTMLInputElement>(null);
  const session = useSession();
  const isAuthorized = session.status === "authenticated";
  const [isWarning, setIsWarning] = React.useState(false);
  const [drag, setDrag] = React.useState<boolean>(false);

  const checkMaxCount = (selectedFiles: File[]) => {
    const isMore = selectedFiles.length > MAX_FILES_COUNT;
    setIsWarning(isMore);
    return isMore;
  };

  const onDragEnterHandler = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(true);
  };

  const onDragLeaveHandler = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthorized) {
      notification("warning", "Please sign up for image loading");
      return setDrag(false);
    }
    const selectedFiles = Array.from(e.dataTransfer.files);

    if (checkMaxCount(selectedFiles)) {
      return;
    }

    const isImages = selectedFiles.every((el) => el.type.includes("image/"));
    if (!isImages) {
      return setIsWarning(true);
    }

    setDrag(false);
    props.onSelect(selectedFiles);
  };

  const onSelectFilesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (checkMaxCount(selectedFiles)) {
      return;
    }

    props.onSelect(selectedFiles);
  };

  const onFileInputClickHandler = () => {
    if (!isAuthorized) {
      return notification("warning", "Please sign up for image loading");
    }
    inputFile?.current?.click();
  };

  const customInputJSX = (
    <span
      onClick={onFileInputClickHandler}
      className={styles.btnInputBlock__btn}
    >
      <Image
        width={48}
        height={48}
        src="/upload.svg"
        alt="Button upload images"
      />
      <span className={styles.btnInputBlock__desc}>Choose files</span>
    </span>
  );

  return (
    <div
      className={`${styles.drop} ${drag ? styles.drag : ""}`}
      onDragEnter={onDragEnterHandler}
      onDragOver={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <div className={styles.drop__init}>
        {customInputJSX}
        <input
          disabled={!isAuthorized}
          ref={inputFile}
          type="file"
          accept="image/*"
          multiple
          className={styles.drop__input}
          onChange={onSelectFilesHandler}
        />
        <h3>Or you can drag-and-drop files here</h3>

        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <PreviewImagesList images={props.images} warning={isWarning} />
            {props.images.length ? (
              <button
                className={styles.btnSubmit}
                onClick={() => props.showModal(true)}
              >
                Continue
              </button>
            ) : null}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default DropZone;

