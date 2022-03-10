import React from "react";
import Header from "./Header";
import TaskTrackerList from "./TaskTrackerList";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { changeIncrement, saveAction } from "../actions";
import { DragDropContext } from "react-beautiful-dnd";
import EditDialog from "./EditDialog";

const TaskTracker = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [edittingTask, setEdittingTask] = useState([]);

  // Edit dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const onOpenEditDialog = (task) => {
    setEdittingTask(task);
    console.log("edittingTask", edittingTask);
    handleOpenEditDialog();
  };

  const editTask = async (task) => {
    dispatch(changeIncrement());
    dispatch(saveAction("task edited"));
    const taskToEdit = await fetchTask(task.id);
    taskToEdit.text = task.text;
    const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(taskToEdit),
    });
    const data = await res.json();
    console.log("data", data);

    setTasks(tasks.map((task) => (task.id === data.id ? data : task)));
  };

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

  const updTaskList = async (tasks) => {
    dispatch(changeIncrement());
    dispatch(saveAction("task list updated"));

    await fetch("http://localhost:5000/tasks", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
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

  const handleOnDragEnd = (result) => {
    console.log("result", result);
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
    updTaskList(items);
  };

  return (
    <div className="task-tracker-container">
      <Header title="Task Tracker" onAdd={addTask} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskTrackerList
          tasks={tasks}
          onOpenEditDialog={onOpenEditDialog}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        />
      </DragDropContext>
      <EditDialog
        selectedTask={edittingTask}
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onEdit={editTask}
      />
    </div>
  );
};

export default TaskTracker;
