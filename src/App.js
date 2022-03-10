import "./App.css";
import { useSelector } from "react-redux";
import TaskTracker from "./components/TaskTracker";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const changeCount = useSelector((state) => state.changeCount);
  const lastAction = useSelector((state) => state.lastAction);

  return (
    <Router>
      <div className="App">
        <h1>Number of changes: {changeCount}</h1>
        <h1>Last Action: {lastAction}</h1>
        <button className="btn">
          <Link to="/">Task Tracker</Link>
        </button>
        <button className="btn">
          <Link to="/about">About</Link>
        </button>
        <Routes>
          <Route path="/" element={<TaskTracker />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
