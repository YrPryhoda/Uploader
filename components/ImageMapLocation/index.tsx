import dynamic from "next/dynamic";
import React from "react";

import Modal from "../Modal";
import styles from "./styles.module.scss";

const NoSSRMap = dynamic(() => import("../LeafletMap/LeafletProvider"), {
  ssr: false
});

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  geo: IGeo;
}

const ImageMapLocation = (props: IProps) => {
  return (
    <Modal isOpen={props.isOpen}>
      <div className={styles.map__container}>
        <NoSSRMap geo={props.geo} onChange={() => {}} />
      </div>
      <button className={styles.btn} onClick={props.onClose}>Close</button>
    </Modal>
  );
};

export default ImageMapLocation;

