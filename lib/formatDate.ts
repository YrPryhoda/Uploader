export const formatDate = (ts: Date) => {
  return new Date(ts).toLocaleString("uk-UA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
