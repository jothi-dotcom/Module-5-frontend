import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../api";

function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({ title: "", description: "", status: "inprocess" });
  const token = localStorage.getItem("token");

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/task`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTask({ title: "", description: "", status: "inprocess" });
      if (onTaskAdded) onTaskAdded(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text"name="title"placeholder="Task Title"value={task.title} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <textarea name="description"placeholder="Task Description"value={task.description} onChange={handleChange}required className="w-full p-2 border rounded"/>
        <select name="status"value={task.status} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="inprocess">In Process</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
