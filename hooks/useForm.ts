import { useState } from "react";

export const useForm = <T>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const resetForm = () => {
    setForm(initialState);
  };

  return {
    form,
    onChange,
    resetForm,
    setForm
  };
};

