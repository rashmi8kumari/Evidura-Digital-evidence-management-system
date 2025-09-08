// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { FaDatabase, FaFlask, FaCheckCircle, FaGavel } from "react-icons/fa";

function AdminDashboard() {
  const [summary, setSummary] = useState(null);

  const fetch = async () => {
    try {
      const res = await api.get("/admin/summary");
      setSummary(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to fetch summary");
    }
  };

  useEffect(() => { fetch(); }, []);

  if (!summary) return <div className="p-4 text-white">Loading...</div>;

  const statusData = Object.entries(summary.byStatus || {}).map(([status, count]) => ({
    name: status,
    value: count
  }));

  const roleData = Object.entries(summary.byHolderRole || {}).map(([role, count]) => ({
    name: role,
    value: count
  }));

  const COLORS = ["#2c77c2ff", "#00C49F", "#FFBB28", "#FF8042", "#a83279"];

  // Common card style
  const cardStyle = {
    backgroundColor: "#2f2f2f", // dark grey
    color: "#ffffff",
    border: "none"
  };

  return (
    <div className="p-3">
      {/* Hero Header */}
      <div className="p-4 rounded shadow-sm mb-4" style={{ backgroundColor: "#3a3a3a", color: "#fff" }}>
        <h2 className="mb-0">Admin Dashboard</h2>
        <p className="mb-0">Monitor evidence flow, user roles, and case progress in real time</p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 text-center">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm" style={cardStyle}>
            <FaDatabase size={30} className="text-primary mb-2" />
            <h6>Total Evidence</h6>
            <h2>{summary.total}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm" style={cardStyle}>
            <FaFlask size={30} className="text-info mb-2" />
            <h6>At FSL</h6>
            <h2>{summary.byStatus?.["At FSL"] || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-primary p-3 shadow-sm" style={cardStyle}>
            <FaCheckCircle size={30} className="text-warning mb-2" />
            <h6>Report Ready</h6>
            <h2>{summary.byStatus?.["Report Ready"] || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm" style={cardStyle}>
            <FaGavel size={30} className="text-success mb-2" />
            <h6>In Court</h6>
            <h2>{summary.byStatus?.["In Court"] || 0}</h2>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm" style={cardStyle}>
            <h6 className="mb-3">Evidence by Status</h6>
            <PieChart width={450} height={300}>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ReTooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm" style={cardStyle}>
            <h6 className="mb-3">Evidence by Holder Role</h6>
            <BarChart width={450} height={300} data={roleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <ReTooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Latest Evidence */}
      <div className="card mt-4 p-3 shadow-sm" style={cardStyle}>
        <h6>Latest Evidence</h6>
        <ul className="list-group list-group-flush mt-2">
          {summary.latest.map(ev => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={ev._id}
              style={{ backgroundColor: "#3a3a3a", color: "#fff" }}
            >
              <div>
                <strong>{ev.caseId}</strong> — {ev.description}
              </div>
              <span className="badge bg-secondary">{ev.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;






