import React from "react";
import Moment from "moment";

export const formatDate = date => {
  return date.format("Do MMMM YYYY");
};

export const formatDay = date => {
  return date.format("dddd");
};
