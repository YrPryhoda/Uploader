import React from "react";
import Avatar from "../../common/Avatar";
import styles from "./styles.module.scss";
import { useForm } from "../../../hooks/useForm";
import Spinner from "../../Spinner";

interface IProps {
  user: IUser;
  onSend: (arg: { text: string }) => void;
  loading: boolean;
}

const ChatInput = ({ user, onSend, loading }: IProps) => {
  const { form, onChange, resetForm } = useForm({
    text: ""
  });

  const handlerSend = () => {
    onSend(form);
    resetForm();
  };

  return (
    <div className={styles.form}>
      {loading ? (
        <Spinner />
      ) : (
        <textarea
          value={form.text}
          name="text"
          onChange={onChange}
          className={styles.form__input}
          cols={30}
          rows={6}
        ></textarea>
      )}
      <div className={styles.form__control}>
        <Avatar user={user} />
        <button onClick={handlerSend} className={styles.form__btn}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

