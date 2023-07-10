// TaskForm.js
import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() === "" || dueDate === "" || time === "") {
      return; // Prevent adding task with empty details
    }
    const task = {
      id: new Date().getTime(),
      description,
      dueDate,
      time,
      completed: false,
    };
    addTask(task);
    setDescription("");
    setDueDate("");
    setTime("");
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDueDate(selectedDate);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTime(selectedTime);
  };

  // Get the current date and time
  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          min={currentDate} // Set minimum date to current date
          onChange={handleDateChange}
        />
      </label>
      <label>
        Time:
        <input type="time" value={time} onChange={handleTimeChange} required />
      </label>
      <button type="submit">Add Task</button>
      <p>Current Time: {currentTime}</p>
    </form>
  );
};

export default TaskForm;
