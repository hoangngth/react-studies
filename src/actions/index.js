export const changeIncrement = () => {
  return {
    type: "CHANGE_INCREMENT",
  };
};

export const saveAction = (action) => {
  return {
    type: "SAVE_ACTION",
    payload: action,
  };
};
