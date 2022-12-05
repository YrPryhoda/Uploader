import { toast, TypeOptions } from "react-toastify";

interface Notification {
  (type: TypeOptions, message?: string): void;
}

export const notification: Notification = (
  type = "error",
  message = "Unsupported error happened"
) => {
  toast(message, {
    type
  });
};

