import { InfinitySpin } from "react-loader-spinner";
import React from "react";

import styles from "./styles.module.scss";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <InfinitySpin width="150" color=" #f7a307" />
    </div>
  );
};

export default Spinner;

