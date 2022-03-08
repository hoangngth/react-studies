import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { changeIncrement, saveAction } from "./actions";
import TaskTracker from "./components/TaskTracker";

function App() {
  const changeCount = useSelector((state) => state.changeCount);
  const lastAction = useSelector((state) => state.lastAction);
  const dispatch = useDispatch();

  const clickButton1 = () => {
    dispatch(changeIncrement());
    dispatch(saveAction("button 1 clicked"));
  };

  const clickButton2 = () => {
    dispatch(changeIncrement());
    dispatch(saveAction("button 2 clicked"));
  };

  console.log(changeCount);
  console.log(lastAction);

  return (
    <div className="App">
      <h1>Number of changes: {changeCount}</h1>
      <h1>Last Action: {lastAction}</h1>
      <button onClick={clickButton1}>Button 1</button>
      <button onClick={clickButton2}>Button 2</button>
      <TaskTracker />
    </div>
  );
}

export default App;
