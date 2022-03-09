import React from "react";
import { FaTimes } from "react-icons/fa";

const TaskTrackerList = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            className={`task ${task.reminder ? "reminder" : ""}`}
            key={task.id}
            onDoubleClick={() => onToggle(task.id)}
          >
            <h3>
              {task.text}
              <FaTimes
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => onDelete(task.id)}
              />
            </h3>
            <p>{task.date}</p>
          </div>
        ))
      ) : (
        <h3>No ongoing task, please add more!</h3>
      )}
    </>
  );
};

export default TaskTrackerList;
