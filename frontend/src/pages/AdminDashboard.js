// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

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

  if (!summary) return <div className="p-4">Loading...</div>;

  // ✅ Prepare pie chart data (status counts)
  const statusData = Object.entries(summary.byStatus || {}).map(([status, count]) => ({
    name: status,
    value: count
  }));

  // ✅ Prepare bar chart data (holder role counts)
  const roleData = Object.entries(summary.byHolderRole || {}).map(([role, count]) => ({
    name: role,
    value: count
  }));

  // Pie chart colors
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a83279"];

  return (
    <div className="p-3">
      <h3>Admin Dashboard</h3>

      {/* Summary Cards */}
      <div className="row g-3 mt-2">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Total Evidence</h6>
            <h2>{summary.total}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>At FSL</h6>
            <h2>{summary.byStatus?.["At FSL"] || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Report Ready</h6>
            <h2>{summary.byStatus?.["Report Ready"] || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>In Court</h6>
            <h2>{summary.byStatus?.["In Court"] || 0}</h2>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Evidence by Status</h6>
            <PieChart width={400} height={300}>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
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
          <div className="card p-3 shadow-sm">
            <h6>Evidence by Holder Role</h6>
            <BarChart width={400} height={300} data={roleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Latest Evidence */}
      <div className="card mt-4 p-3 shadow-sm">
        <h6>Latest Evidence</h6>
        <ul className="list-group list-group-flush mt-2">
          {summary.latest.map(ev => (
            <li className="list-group-item" key={ev._id}>
              <strong>{ev.caseId}</strong> — {ev.description}
              <span className="badge bg-secondary float-end">{ev.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;



