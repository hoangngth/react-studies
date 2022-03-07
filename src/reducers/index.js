import { combineReducers } from "redux";

import changeCounter from "./changeCounter";
import lastAction from "./lastAction";

const allReducers = combineReducers({
  changeCount: changeCounter,
  lastAction: lastAction,
});

export default allReducers;
