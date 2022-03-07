const lastAction = (state = "none", action) => {
  switch (action.type) {
    case "SAVE_ACTION":
      return action.payload;
    default:
      return state;
  }
};

export default lastAction;
