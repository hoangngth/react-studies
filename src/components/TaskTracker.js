import React from "react";
import Header from "./Header";
import TaskTrackerList from "./TaskTrackerList";
import { useState } from "react";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      text: "Task 1",
      date: "3/8/2022",
      reminder: true,
    },
    {
      id: "2",
      text: "Task 2",
      date: "3/9/2022",
      reminder: true,
    },
  ]);

  const addTask = (task) => {
    const newTask = { id: 3, ...task };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="task-tracker-container">
      <Header title="Task Tracker" onAdd={addTask} />
      <TaskTrackerList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleReminder}
      />
    </div>
  );
};

export default TaskTracker;
