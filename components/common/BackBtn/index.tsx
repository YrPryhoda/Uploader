import { useRouter } from "next/router";
import React from "react";

import styles from "./styles.module.scss";

const BackBtn = () => {
  const router = useRouter();

  const onClick = () => router.back();

  return (
    <button className={styles.btn} onClick={onClick}>
      Return
    </button>
  );
};

export default BackBtn;

