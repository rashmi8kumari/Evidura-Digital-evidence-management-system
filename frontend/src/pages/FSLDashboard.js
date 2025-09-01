// src/pages/FSLDashboard.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";
import { Link } from "react-router-dom";

function FSLDashboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/evidence"); // role-aware on backend
      setList(res.data.data || res.data); // depending on API shape
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetch(); }, []);

  const markReport = async (ev) => {
    if (!window.confirm("Mark report ready for this evidence?")) return;
    try {
      await api.post(`/custody/${ev._id}/transfer`, { toUserId: ev.currentHolder?._id || ev.currentHolder, action: "Report Ready" });
      fetch();
      alert("Marked Report Ready");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed");
    }
  };

  return (
    <div>
      <h3>FSL Dashboard</h3>
      <div className="card">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr><th>Case</th><th>Description</th><th>Status</th><th>Holder</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan="5" className="text-center p-4">Loading...</td></tr> :
                list.length ? list.map(ev => (
                  <tr key={ev._id}>
                    <td>{ev.caseId}</td>
                    <td style={{maxWidth:300}}>{ev.description}</td>
                    <td><span className="badge bg-info">{ev.status}</span></td>
                    <td>{ev.currentHolder?.name}</td>
                    <td>
                      <Link to={`/evidence/${ev._id}`} className="btn btn-sm btn-outline-primary me-2">View</Link>
                      <button className="btn btn-sm btn-success" onClick={()=>markReport(ev)}>Mark Report Ready</button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="5" className="text-center p-4">No items</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FSLDashboard;
