import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "D MMMM YYYY");
};

export const formatDay = (date: Date) => {
  return format(date, "dddd");
};

export const formatDateFromAPI = (date: Date) => {
  const newDate = new Date(String(date));
  return newDate;
};
