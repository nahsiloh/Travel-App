import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "d LLL yyyy");
};

export const formatDay = (date: Date) => {
  return format(date, "dddd");
};

export const formatStringToDate = (date: string) => {
  return new Date(date);
};
