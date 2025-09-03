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
      alert(err.response?.data?.msg || "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!item) return <div className="p-4">No evidence found</div>;

  return (
    <div>
      <h4>Evidence Details</h4>
      <div className="card mb-3 p-3">
        <h5>{item.caseId}</h5>
        <p>{item.description}</p>
        <div>
          Status: <span className="badge bg-info">{item.status}</span>
        </div>
        <div>Current Holder: {item.currentHolder?.name || "—"}</div>
        <div>Created By: {item.createdBy?.name || "—"}</div>
      </div>

      <div className="card p-3">
        <h6>Custody Timeline</h6>
        <ul className="list-group list-group-flush mt-2">
          {logs.length ? (
            logs.map((l) => (
              <li className="list-group-item" key={l._id}>
                <div>
                  <strong>{l.action}</strong> —{" "}
                  {new Date(l.timestamp).toLocaleString()}
                </div>
                <div className="text-muted small">
                  From: {l.fromUser?.name || "—"} | To: {l.toUser?.name || "—"}
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">No logs available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default EvidenceDetails;
