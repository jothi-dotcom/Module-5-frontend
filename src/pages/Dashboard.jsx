import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Tasklist from "../components/Tasklist";
import Taskform from "../components/Taskform";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="tasks" className="hover:bg-gray-700 p-2 rounded">View Tasks</Link>
          <Link to="add-task" className="hover:bg-gray-700 p-2 rounded"> Add Task</Link>
        </nav>
      </aside>

      
      <main className="flex-1 p-6">
        <Routes>
          <Route path="tasks" element={<Tasklist />} />
          <Route path="add-task" element={<Taskform />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
