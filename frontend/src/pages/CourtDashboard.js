// src/pages/CourtDashboard.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";
import { Link } from "react-router-dom";

function CourtDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await api.get("/evidence");

      // Sirf Court ke liye records
      const courtData = res.data.data.filter(
        (ev) => ev.status === "In Transit" || ev.status === "In Court"
      );

      setData(courtData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const doAction = async (id, action) => {
    try {
      await api.post(`/custody/${id}/transfer`, { action });
      fetchList(); // refresh
    } catch (err) {
      alert(err.response?.data?.msg || "Action failed");
    }
  };

  // Card Style
  const cardStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 text-center fw-bold">Court Dashboard</h3>

      <div className="card shadow-lg" style={cardStyle}>
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>Case ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Holder</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-muted">
                    Loading records...
                  </td>
                </tr>
              ) : data.length ? (
                data.map((ev, index) => (
                  <tr
                    key={ev._id}
                    className="fade-in-row"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td>
                      <span className="fw-bold text-primary">{ev.caseId}</span>
                    </td>
                    <td>{ev.description}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          ev.status === "In Court"
                            ? "bg-success text-white"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {ev.status}
                      </span>
                    </td>
                    <td>{ev.currentHolder?.name || "—"}</td>
                    <td className="text-center">
                      <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={`/evidence/${ev._id}`}
                      >
                        View
                      </Link>

                      {ev.status === "In Transit" && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => doAction(ev._id, "Received")}
                        >
                          Receive
                        </button>
                      )}

                      {ev.status === "In Court" && (
                        <span className="badge bg-success">
                          Evidence in Court
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-muted">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Animation CSS */}
      <style>{`
        .fade-in-row {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.6s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        table tbody tr:hover {
          background-color: #f1f1f1;
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default CourtDashboard;










