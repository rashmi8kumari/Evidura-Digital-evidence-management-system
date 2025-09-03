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
    <div>
      <h3 className="mb-3">Court Dashboard</h3>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Case ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Holder</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : data.length ? (
                data.map((ev) => (
                  <tr key={ev._id}>
                    <td>{ev.caseId}</td>
                    <td>{ev.description}</td>
                    <td>
                      <span
                        className={`badge ${
                          ev.status === "In Court"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {ev.status}
                      </span>
                    </td>
                    <td>{ev.currentHolder?.name || "—"}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={`/evidence/${ev._id}`}
                      >
                        View
                      </Link>

                      {/* ✅ Receive Button only for Court */}
                      {ev.status === "In Transit" && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => doAction(ev._id, "Received")}
                        >
                          Receive
                        </button>
                      )}

                      {/* ✅ Already in Court → Readonly */}
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
                  <td colSpan="5" className="text-center p-4">
                    No records
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







