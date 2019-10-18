import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

export const formatDate = date => {
  return date.format("Do MMMM YYYY");
};

export const formatDay = date => {
  return date.format("dddd");
};

export const formatDateFromAPI = date => {
  const newDate = new Date(String(date));
  return moment(newDate);
};
