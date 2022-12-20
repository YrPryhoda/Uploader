import { useEffect } from "react";

import styles from "./styles.module.scss";

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal = ({ isOpen, children }: IProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__form}>{children}</div>
    </div>
  );
};

export default Modal;

