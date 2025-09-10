// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { FaDatabase, FaFlask, FaCheckCircle, FaGavel } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import "animate.css";

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

  useEffect(() => {
    fetch();
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (!summary) return <div className="p-4 text-center">Loading...</div>;

  const statusData = Object.entries(summary.byStatus || {}).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );

  const roleData = Object.entries(summary.byHolderRole || {}).map(
    ([role, count]) => ({
      name: role,
      value: count,
    })
  );

  const COLORS = ["#2c77c2", "#00C49F", "#FFBB28", "#FF8042", "#a83279"];

  // Common white card style
  const cardStyle = {
    background: "#ffffff",
    color: "#000000",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px",
  };

  return (
    <div className="p-3">
      {/* Hero Header as White Box */}
      <div
        className="p-4 rounded shadow-sm mb-4 animate__animated animate__fadeInDown"
        style={cardStyle}
      >
        <h2 className="mb-1 fw-bold">Admin Dashboard</h2>
        <p className="mb-0 text-muted">
          Monitor evidence flow, user roles, and case progress in real time
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 text-center">
        <div className="col-md-3" data-aos="zoom-in">
          <div className="card p-3 shadow-lg" style={cardStyle}>
            <FaDatabase size={35} className="text-primary mb-2" />
            <h6>Total Evidence</h6>
            <h2 className="fw-bold">{summary.total}</h2>
          </div>
        </div>
        <div className="col-md-3" data-aos="zoom-in" data-aos-delay="100">
          <div className="card p-3 shadow-lg" style={cardStyle}>
            <FaFlask size={35} className="text-info mb-2" />
            <h6>At FSL</h6>
            <h2 className="fw-bold">{summary.byStatus?.["At FSL"] || 0}</h2>
          </div>
        </div>
        <div className="col-md-3" data-aos="zoom-in" data-aos-delay="200">
          <div className="card p-3 shadow-lg" style={cardStyle}>
            <FaCheckCircle size={35} className="text-warning mb-2" />
            <h6>Report Ready</h6>
            <h2 className="fw-bold">{summary.byStatus?.["Report Ready"] || 0}</h2>
          </div>
        </div>
        <div className="col-md-3" data-aos="zoom-in" data-aos-delay="300">
          <div className="card p-3 shadow-lg" style={cardStyle}>
            <FaGavel size={35} className="text-success mb-2" />
            <h6>In Court</h6>
            <h2 className="fw-bold">{summary.byStatus?.["In Court"] || 0}</h2>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mt-4">
        <div className="col-md-6" data-aos="fade-right">
          <div className="card p-3 shadow-lg" style={cardStyle}>
            <h6 className="mb-3 text-primary">Evidence by Status</h6>
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ReTooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className="col-md-6" data-aos="fade-left">
          <div className="card p-3 shadow-lg" style={cardStyle}>
            <h6 className="mb-3 text-warning">Evidence by Holder Role</h6>
            <BarChart width={450} height={300} data={roleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" stroke="#000" />
              <YAxis stroke="#000" />
              <ReTooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Latest Evidence */}
      <div
        className="card mt-4 p-3 shadow-lg animate__animated animate__fadeInUp"
        style={cardStyle}
      >
        <h6 className="mb-3 text-success">Latest Evidence</h6>
        <ul className="list-group list-group-flush">
          {summary.latest.map((ev, i) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={ev._id}
              style={{
                backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#ffffff",
                color: "#000",
                border: "none",
              }}
            >
              <div>
                <strong>{ev.caseId}</strong> — {ev.description}
              </div>
              <span className="badge bg-dark text-white">{ev.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;










