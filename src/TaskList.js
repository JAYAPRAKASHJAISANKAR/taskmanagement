// TaskList.js
import React from "react";

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  const handleComplete = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(taskId, updatedTask);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span>{task.description}</span>
          <span>{task.dueDate}</span>
          <span>{task.priority}</span>
          <button onClick={() => handleComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
