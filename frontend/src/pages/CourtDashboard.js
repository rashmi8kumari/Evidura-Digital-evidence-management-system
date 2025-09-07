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

      // ✅ Court me sirf wahi records dikhne chahiye jo Court ke liye aaye hain
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
      fetchList(); // refresh after action
    } catch (err) {
      alert(err.response?.data?.msg || "Action failed");
    }
  };

  return (
    <div className="p-3">
      <h3 className="mb-4">⚖️ Court Dashboard</h3>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
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
                  <td colSpan="5" className="text-center p-4">
                    Loading records...
                  </td>
                </tr>
              ) : data.length ? (
                data.map((ev) => (
                  <tr key={ev._id}>
                    <td>
                      <span className="fw-bold">{ev.caseId}</span>
                    </td>
                    <td>{ev.description}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          ev.status === "In Court"
                            ? "bg-success"
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

                      {/* ✅ Receive Button only if status = In Transit */}
                      {ev.status === "In Transit" && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => doAction(ev._id, "Received")}
                        >
                          ✅ Receive
                        </button>
                      )}

                      {/* ✅ Already in Court → Readonly badge */}
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
    </div>
  );
}

export default CourtDashboard;








