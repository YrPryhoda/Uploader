import React from "react";
import DropZone from "../DropZone";
import styles from "./styles.module.scss";

const FileUploadForm = () => {
  return (
    <div className={styles.formContainer}>
      <DropZone />
    </div>
  );
};

export default FileUploadForm;

