export const answered = (value) => ({
  type: "ACTION_ANSWERED",
  payload: value,
});

export const answeredClean = () => ({
  type: "ANSWERED_CLEAR",
  payload: "",
});
