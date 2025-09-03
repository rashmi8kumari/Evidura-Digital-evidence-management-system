import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";
import { Link } from "react-router-dom";

function FSLDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courtUsers, setCourtUsers] = useState([]);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await api.get("/evidence");

      // ✅ Filter only FSL-relevant evidence
      const filtered = res.data.data.filter(
        (ev) =>
          ev.status === "In Transit" ||
          ev.status === "At FSL" ||
          ev.status === "Report Ready"
      );

      setData(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();

    // 🔹 Fetch all Court users
    api
      .get("/users?role=court")
      .then((res) => setCourtUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const doAction = async (id, action, toUserId = null) => {
    try {
      await api.post(`/custody/${id}/transfer`, { action, toUserId });
      fetchList(); // refresh after action
    } catch (err) {
      alert(err.response?.data?.msg || "Action failed");
    }
  };

  return (
    <div>
      <h3 className="mb-3">FSL Dashboard</h3>

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
                      <span className="badge bg-secondary">{ev.status}</span>
                    </td>
                    <td>{ev.currentHolder?.name || "—"}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={`/evidence/${ev._id}`}
                      >
                        View
                      </Link>

                      {/* ✅ Receive Button */}
                      {ev.status === "In Transit" && (
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => doAction(ev._id, "Received")}
                        >
                          Receive
                        </button>
                      )}

                      {/* ✅ Mark Report Ready */}
                      {ev.status === "At FSL" && (
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => doAction(ev._id, "Report Ready")}
                        >
                          Mark Report Ready
                        </button>
                      )}

                      {/* ✅ Send to Court */}
                      {ev.status === "Report Ready" &&
                        courtUsers.length > 0 && (
                          <button
                            className="btn btn-sm btn-dark"
                            onClick={() =>
                              doAction(ev._id, "Transferred", courtUsers[0]._id)
                            }
                          >
                            Send to Court
                          </button>
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

export default FSLDashboard;







