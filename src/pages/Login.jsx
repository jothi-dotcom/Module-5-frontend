import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="email"name="email"placeholder="Email"value={form.email}onChange={handleChange}className="w-full p-2 border rounded"/>
          <input type="password"name="password"placeholder="Password"value={form.password}onChange={handleChange}className="w-full p-2 border rounded"/>
          <button type="submit"className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        </form>
        <p className="text-sm mt-3 text-center">
          Don't have an account?
          <Link to="/register" className="text-blue-600 underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
