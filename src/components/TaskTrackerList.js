import React from "react";
import { FaTimes, FaPen } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TaskTrackerList = ({ tasks, onOpenEditDialog, onDelete, onToggle }) => {
  return (
    <>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            className="tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task ${task.reminder ? "reminder" : ""}`}
                      onDoubleClick={() => onToggle(task.id)}
                    >
                      <h3>
                        {task.text}
                        <div>
                          <FaPen
                            style={{ color: "grey", cursor: "pointer" }}
                            onClick={() => onOpenEditDialog(task)}
                          />
                          <FaTimes
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => onDelete(task.id)}
                          />
                        </div>
                      </h3>
                      <p>Created date: {task.date}</p>
                    </li>
                  )}
                </Draggable>
              ))
            ) : (
              <h3>No ongoing task, please add more!</h3>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </>
  );
};

export default TaskTrackerList;
