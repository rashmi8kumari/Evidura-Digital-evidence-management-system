// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";

function AdminDashboard() {
  const [summary, setSummary] = useState(null);

  const fetch = async () => {
    try {
      const res = await api.get("/admin/summary");
      setSummary(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed");
    }
  };

  useEffect(()=>{ fetch(); }, []);

  if (!summary) return <div className="p-4">Loading...</div>;

  return (
    <div>
      <h3>Admin Dashboard</h3>
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card p-3">
            <h6>Total Evidence</h6>
            <h2>{summary.total}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h6>At FSL</h6>
            <h2>{summary.byStatus?.["At FSL"] || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h6>Report Ready</h6>
            <h2>{summary.byStatus?.["Report Ready"] || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h6>In Court</h6>
            <h2>{summary.byStatus?.["In Court"] || 0}</h2>
          </div>
        </div>
      </div>

      <div className="card mt-4 p-3">
        <h6>Latest Evidence</h6>
        <ul className="list-group list-group-flush mt-2">
          {summary.latest.map(ev => (
            <li className="list-group-item" key={ev._id}>
              <strong>{ev.caseId}</strong> — {ev.description} <span className="badge bg-secondary float-end">{ev.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;

