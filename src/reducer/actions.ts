export const updateStartDate = (startDate: Date) => {
  return {
    type: "UPDATE_START_DATE",
    payload: startDate,
  };
};

export const updateEndDate = (endDate: Date) => {
  return {
    type: "UPDATE_END_DATE",
    payload: endDate,
  };
};
