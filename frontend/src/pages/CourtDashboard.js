// src/pages/CourtDashboard.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";
import { Link } from "react-router-dom";

function CourtDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/evidence");
      setData(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetch(); }, []);

  return (
    <div>
      <h3>Court Dashboard</h3>
      <div className="card">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light"><tr><th>Case</th><th>Description</th><th>Status</th><th>Holder</th><th>View</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan="5" className="text-center p-4">Loading...</td></tr> :
                data.length ? data.map(ev => (
                  <tr key={ev._id}>
                    <td>{ev.caseId}</td>
                    <td style={{maxWidth:300}}>{ev.description}</td>
                    <td><span className="badge bg-warning text-dark">{ev.status}</span></td>
                    <td>{ev.currentHolder?.name}</td>
                    <td><Link to={`/evidence/${ev._id}`} className="btn btn-sm btn-outline-primary">View</Link></td>
                  </tr>
                )) : <tr><td colSpan="5" className="text-center p-4">No records</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourtDashboard;
