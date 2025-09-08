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
    return <div className="p-4 text-white">Loading evidence details...</div>;
  if (!item) return <div className="p-4 text-muted">No evidence found</div>;

  // 🔹 Dark card style
  const cardStyle = {
    backgroundColor: "#2f2f2f",
    color: "#ffffff",
    border: "none",
  };

  return (
    <div className="p-3">
      <h3 className="mb-4 text-black">Evidence Details</h3>

      {/* Evidence Info Card */}
      <div className="card shadow-sm mb-4" style={cardStyle}>
        <div className="card-body">
          <h4 className="card-title text-info">{item.caseId}</h4>
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
      <div className="card shadow-sm" style={cardStyle}>
        <div className="card-body">
          <h5 className="card-title text-warning">Custody Timeline</h5>
          <ul className="list-group list-group-flush mt-2">
            {logs.length ? (
              logs.map((l) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-start"
                  key={l._id}
                  style={{ backgroundColor: "#2f2f2f", color: "#fff" }} // dark bg + white text
                >
                  <div>
                    <div className="fw-bold text-white">{l.action}</div>
                    <small style={{ color: "#ddd" }}>
                      {new Date(l.timestamp).toLocaleString()}
                    </small>
                    <div style={{ color: "#ccc", fontSize: "0.85rem" }}>
                      From: {l.fromUser?.name || "—"} → To:{" "}
                      {l.toUser?.name || "—"}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li
                className="list-group-item"
                style={{ backgroundColor: "#2f2f2f", color: "#ccc" }}
              >
                No custody logs available
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EvidenceDetails;
