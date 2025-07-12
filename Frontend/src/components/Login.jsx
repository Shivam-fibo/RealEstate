import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful!");
        navigate("/home")
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {message && <p className="text-center text-sm text-green-600">{message}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
          value={form.password}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
