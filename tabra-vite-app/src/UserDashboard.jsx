import React, { useEffect, useState } from "react";

const API_BASE = "https://script.google.com/macros/s/AKfycbzl6LvvbOmUOZF_CW1SRtSGoRMIYGNMewR_Gf6Kk0RvIsQFi90WRWM2lQJwPk8E_JeJtA/exec";

export default function UserDashboard({ username }) {
  const [taskList, setTaskList] = useState([]);
  const [report, setReport] = useState({
    date: "",
    progress: "",
    issues: "",
    location: "",
    labor: "",
    inventory: "",
    photo: null
  });

  useEffect(() => {
    fetch(`${API_BASE}?action=getTasks&username=${username}`)
      .then(res => res.json())
      .then(setTaskList);
  }, [username]);

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(report).forEach(([key, value]) => formData.append(key, value));
    formData.append("username", username);

    await fetch(`${API_BASE}?action=submitReport`, {
      method: "POST",
      body: formData
    });
    alert("Report submitted successfully");
    setReport({ date: "", progress: "", issues: "", location: "", labor: "", inventory: "", photo: null });
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem' }}>
      <h1>Welcome, {username}</h1>
      <h3>Assigned Tasks</h3>
      <ul>
        {taskList.length ? taskList.map((t, i) => <li key={i}>{t.task}</li>) : <li>No tasks assigned.</li>}
      </ul>

      <h3>Submit Site Report</h3>
      <input type="date" value={report.date} onChange={e => setReport({ ...report, date: e.target.value })} /><br />
      <textarea placeholder="Progress" value={report.progress} onChange={e => setReport({ ...report, progress: e.target.value })}></textarea><br />
      <textarea placeholder="Issues" value={report.issues} onChange={e => setReport({ ...report, issues: e.target.value })}></textarea><br />
      <input placeholder="Location" value={report.location} onChange={e => setReport({ ...report, location: e.target.value })} /><br />
      <input placeholder="Labourers/Contractors" value={report.labor} onChange={e => setReport({ ...report, labor: e.target.value })} /><br />
      <textarea placeholder="Inventory Used" value={report.inventory} onChange={e => setReport({ ...report, inventory: e.target.value })}></textarea><br />
      <input type="file" accept="image/*" onChange={e => setReport({ ...report, photo: e.target.files[0] })} /><br />
      <button onClick={handleSubmit}>Submit Report</button>
    </div>
  );
}