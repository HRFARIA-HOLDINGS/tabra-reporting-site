import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import UserDashboard from "./UserDashboard.jsx";

export default function App() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={role === "admin" ? <AdminDashboard username={username} /> : <Navigate to="/login" />} />
        <Route path="/user" element={role === "user" ? <UserDashboard username={username} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}