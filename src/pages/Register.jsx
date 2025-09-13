import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/auth/register`, form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text"name="username"placeholder="Username"value={form.username}onChange={handleChange}className="w-full p-2 border rounded"/>
          <input type="email"name="email"placeholder="Email"value={form.email}onChange={handleChange}className="w-full p-2 border rounded"/>
          <input type="password"name="password"placeholder="Password"value={form.password}onChange={handleChange}className="w-full p-2 border rounded"/>
          <button type="submit"className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Register</button>
        </form>
        <p className="text-sm mt-3 text-center">
          Already have an account?
          <Link to="/" className="text-blue-600 underline">Login </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
