// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
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

  // ✅ Prepare chart data
  const statusData = Object.entries(summary.byStatus || {}).map(([name, value]) => ({ name, value }));
  const roleData = Object.entries(summary.byRole || {}).map(([name, value]) => ({ name, value }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

  return (
    <div className="p-3">
      <h3 className="mb-4">Admin Dashboard</h3>

      {/* Summary Cards */}
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h6>Total Evidence</h6>
            <h2>{summary.total}</h2>
          </div>
        </div>
        {Object.entries(summary.byStatus || {}).map(([status, count]) => (
          <div className="col-md-3" key={status}>
            <div className="card p-3 text-center shadow-sm">
              <h6>{status}</h6>
              <h2>{count}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Status Distribution</h6>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h6>Holder Role Counts</h6>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roleData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Latest Evidence */}
      <div className="card mt-4 p-3">
        <h6>Latest Evidence</h6>
        <ul className="list-group list-group-flush mt-2">
          {summary.latest?.map((ev) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={ev._id}>
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


