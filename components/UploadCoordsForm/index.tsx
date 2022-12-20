import React, { Fragment } from "react";
import dynamic from "next/dynamic";

import { useForm } from "../../hooks/useForm";
import styles from "./styles.module.scss";
import Modal from "../Modal";

interface IProps {
	isOpen: boolean;
  onSubmit: (arg?: IGeo) => void;
  handlerClose: (arg: boolean) => void;
}

const NoSSRMap = dynamic(() => import("../LeafletMap/LeafletProvider"), {
  ssr: false
});

const UploadCoordsForm = (props: IProps) => {
  const { form, onChange, setForm } = useForm<IGeo>({
    lat: 50.450001,
    lng: 30.523333
  });

  const withGeoSubmit = () => {
    props.onSubmit(form);
  };

  const withSkipSubmit = () => {
    props.onSubmit();
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Fragment>
        <h3>You can bind images to geo coordinates</h3>
        <div className={styles.modal__fields}>
          <label className={styles.modal__field}>
            <p>Longtitude</p>
            <input
              type="text"
              name="lng"
              value={form.lng}
              onChange={onChange}
            />
          </label>
          <label className={styles.modal__field}>
            <p>Latitude</p>
            <input
              type="text"
              name="lat"
              value={form.lat}
              onChange={onChange}
            />
          </label>
        </div>
        <div className={`${styles.modal__fields} ${styles.modal__map}`}>
          <NoSSRMap geo={form} onChange={setForm} />
        </div>
        <div className={`${styles.modal__fields} ${styles.modal__btns}`}>
          <button
            className={`${styles.modal__btn} ${styles.btn_skip}`}
            onClick={withSkipSubmit}
          >
            Skip and Finish
          </button>
          <button
            className={`${styles.modal__btn} ${styles.btn_upload}`}
            onClick={withGeoSubmit}
          >
            Upload
          </button>
          <button
            className={`${styles.modal__btn} ${styles.btn_upload}`}
            onClick={() => props.handlerClose(false)}
          >
            Close
          </button>
        </div>
      </Fragment>
    </Modal>
  );
};

export default UploadCoordsForm;

