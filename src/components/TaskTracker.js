import React from "react";
import Header from "./Header";
import TaskTrackerList from "./TaskTrackerList";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { changeIncrement, saveAction } from "../actions";

const TaskTracker = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = res.json();
    return data;
  };

  const addTask = async (task) => {
    dispatch(changeIncrement());
    dispatch(saveAction("task added"));
    const newTask = { id: uuidv4(), ...task };

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    dispatch(changeIncrement());
    dispatch(saveAction("task deleted"));
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    dispatch(changeIncrement());
    dispatch(saveAction("reminder toggled"));
    const taskToToggle = await fetchTask(id);
    taskToToggle.reminder = !taskToToggle.reminder;
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(taskToToggle),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
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
