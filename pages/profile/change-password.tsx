import React from "react";

import ChangePasswordForm from "../../components/ChangePasswordForm";
import styles from '../../styles/Page.module.css';

const ChangePassword = () => {
  return (
    <div className={styles.document}>
      <h2>You can change your account password</h2>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePassword;

