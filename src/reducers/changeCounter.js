const changeCounter = (state = 0, action) => {
  switch (action.type) {
    case "CHANGE_INCREMENT":
      return state + 1;
    default:
      return state;
  }
};

export default changeCounter;
