import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ include cookies
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registered successfully! You can now log in.");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {message && <p className="text-center text-sm text-red-500">{message}</p>}
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
          value={form.name}
          required
        />
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
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
