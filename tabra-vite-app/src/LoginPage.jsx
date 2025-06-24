import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://script.google.com/macros/s/AKfycbzl6LvvbOmUOZF_CW1SRtSGoRMIYGNMewR_Gf6Kk0RvIsQFi90WRWM2lQJwPk8E_JeJtA/exec";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}?action=login`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("username", form.username);
      localStorage.setItem("role", data.role);
      navigate(data.role === "admin" ? "/admin" : "/user");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Tabra Realty LLP - Login</h2>
      <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} /><br />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><br />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}