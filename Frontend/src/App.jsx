import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <nav className="mb-8 space-x-4">
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
