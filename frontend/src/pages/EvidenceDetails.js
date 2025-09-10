// src/pages/EvidenceDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/auth";

function EvidenceDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/evidence/${id}`);
      setItem(res.data.evidence || res.data);
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to fetch details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  if (loading)
    return <div className="p-4 text-muted">Loading evidence details...</div>;
  if (!item) return <div className="p-4 text-muted">No evidence found</div>;

  // Card Style (white theme)
  const cardStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 text-center fw-bold">Evidence Details</h3>

      {/* Evidence Info Card */}
      <div className="card shadow-lg mb-4 fade-in" style={cardStyle}>
        <div className="card-body">
          <h4 className="card-title text-primary fw-bold">{item.caseId}</h4>
          <p className="card-text">{item.description}</p>

          <div className="mb-2">
            <span className="fw-bold">Status:</span>{" "}
            <span
              className={`badge px-3 py-2 ${
                item.status === "In Court"
                  ? "bg-success"
                  : item.status === "Report Ready"
                  ? "bg-primary"
                  : item.status === "At FSL"
                  ? "bg-info text-dark"
                  : item.status === "In Transit"
                  ? "bg-warning text-dark"
                  : "bg-secondary"
              }`}
            >
              {item.status}
            </span>
          </div>

          <div>
            <span className="fw-bold">Current Holder:</span>{" "}
            {item.currentHolder?.name || "—"}
          </div>
          <div>
            <span className="fw-bold">Created By:</span>{" "}
            {item.createdBy?.name || "—"}
          </div>
        </div>
      </div>

      {/* Custody Timeline */}
      <div className="card shadow-lg fade-in" style={cardStyle}>
        <div className="card-body">
          <h5 className="card-title text-dark fw-bold">Custody Timeline</h5>
          <ul className="list-group list-group-flush mt-3">
            {logs.length ? (
              logs.map((l, index) => (
                <li
                  className="list-group-item fade-in-row"
                  key={l._id}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#000",
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div>
                    <div className="fw-bold text-primary">{l.action}</div>
                    <small className="text-muted">
                      {new Date(l.timestamp).toLocaleString()}
                    </small>
                    <div style={{ fontSize: "0.9rem" }}>
                      From:{" "}
                      <span className="fw-semibold">
                        {l.fromUser?.name || "—"}
                      </span>{" "}
                      → To:{" "}
                      <span className="fw-semibold">
                        {l.toUser?.name || "—"}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li
                className="list-group-item text-muted"
                style={{ backgroundColor: "#fff" }}
              >
                No custody logs available
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.6s forwards;
        }
        .fade-in-row {
          opacity: 0;
          transform: translateX(-10px);
          animation: fadeInLeft 0.6s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .list-group-item {
          border: none;
          border-bottom: 1px solid #eee;
        }
        .list-group-item:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}

export default EvidenceDetails;

