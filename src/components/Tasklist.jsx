import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../api";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", status: "inprocess" });
  const token = localStorage.getItem("token");

  
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${baseURL}/task`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`${baseURL}/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };


  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditData({ title: task.title, description: task.description, status: task.status });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/task/${editingTask}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingTask(null);
      fetchTasks(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found. Add some!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 bg-white shadow rounded">
              {editingTask === task._id ? (
                <form onSubmit={handleEditSubmit} className="space-y-2">
                  <input type="text"value={editData.title}onChange={(e) => setEditData({ ...editData, title: e.target.value })}className="w-full p-2 border rounded"required/>
                  <textarea value={editData.description}onChange={(e) => setEditData({ ...editData, description: e.target.value })}className="w-full p-2 border rounded"required/>
                  <select value={editData.status}onChange={(e) => setEditData({ ...editData, status: e.target.value })}className="w-full p-2 border rounded">
                    <option value="inprocess">In Process</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
                    <button type="button"onClick={() => setEditingTask(null)}className="bg-gray-400 text-white px-4 py-1 rounded"> Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        task.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : task.status === "inprocess"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
