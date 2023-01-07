import { format } from "date-fns";

export const formatDate = (ts: Date) => {
  return format(new Date(ts), "HH:mm, d MMM yyyy");
};

