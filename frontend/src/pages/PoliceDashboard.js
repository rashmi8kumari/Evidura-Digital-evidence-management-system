// src/pages/PoliceDashboard.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function PoliceDashboard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // modal states
  const [showAdd, setShowAdd] = useState(false);
  const [transferItem, setTransferItem] = useState(null);

  const fetchList = async (p = 1) => {
    setLoading(true);
    try {
      const q = [];
      q.push(`page=${p}`);
      q.push(`limit=${limit}`);
      q.push(`mine=true`);
      if (caseId) q.push(`caseId=${encodeURIComponent(caseId)}`);
      if (statusFilter) q.push(`status=${encodeURIComponent(statusFilter)}`);
      const res = await api.get(`/evidence?${q.join("&")}`);
      setData(res.data.data || res.data);
      setPage(res.data.page || 1);
      setPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(1);
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary">🚔 Police Dashboard</h3>
        <button className="btn btn-success fw-semibold" onClick={() => setShowAdd(true)}>
          + Add Evidence
        </button>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Case ID</label>
              <input
                placeholder="Search by caseId"
                className="form-control"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Seized">Seized</option>
                <option value="In Transit">In Transit</option>
                <option value="At FSL">At FSL</option>
                <option value="Report Ready">Report Ready</option>
                <option value="In Court">In Court</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-primary w-100 fw-semibold"
                onClick={() => fetchList(1)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-primary">
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
                    <td className="fw-semibold">{ev.caseId}</td>
                    <td style={{ maxWidth: 300 }}>{ev.description}</td>
                    <td>
                      <span
                        className={`badge ${
                          ev.status === "Seized"
                            ? "bg-warning text-dark"
                            : ev.status === "In Court"
                            ? "bg-success"
                            : "bg-secondary"
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
                      {ev.status === "Seized" && (
                        <button
                          className="btn btn-sm btn-warning fw-semibold"
                          onClick={() => setTransferItem(ev)}
                        >
                          Transfer ➡️
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card-footer d-flex justify-content-between align-items-center">
          <span className="small">
            Page {page} of {pages}
          </span>
          <div>
            <button
              className="btn btn-sm btn-outline-primary me-2"
              disabled={page <= 1}
              onClick={() => fetchList(page - 1)}
            >
              ◀ Prev
            </button>
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={page >= pages}
              onClick={() => fetchList(page + 1)}
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>

      {/* Add Evidence Modal */}
      <AddEvidenceModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onCreated={() => {
          fetchList(1);
          setShowAdd(false);
        }}
      />

      {/* Transfer Modal */}
      {transferItem && (
        <TransferModal
          evidence={transferItem}
          onHide={() => setTransferItem(null)}
          onTransferred={() => {
            fetchList(1);
            setTransferItem(null);
          }}
        />
      )}
    </div>
  );
}

export default PoliceDashboard;

/* AddEvidenceModal */
function AddEvidenceModal({ show, onHide, onCreated }) {
  const [caseId, setCaseId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await api.post("/evidence", { caseId, description });
      setCaseId("");
      setDescription("");
      onCreated();
    } catch (error) {
      setErr(error.response?.data?.msg || "Create failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Evidence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {err && <div className="alert alert-danger">{err}</div>}
          <div className="mb-3">
            <label className="form-label">Case ID</label>
            <input
              className="form-control"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={busy}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={busy}>
            {busy ? "Creating..." : "Create"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

/* TransferModal */
function TransferModal({ evidence, onHide, onTransferred }) {
  const [users, setUsers] = React.useState([]);
  const [toUser, setToUser] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/users?role=fsl");
        setUsers(res.data || []);
        if ((res.data || []).length) setToUser(res.data[0]._id);
      } catch (e) {
        console.error(e);
        setErr("Failed to load FSL users");
      }
    };
    loadUsers();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setErr("");
    if (!toUser) {
      setErr("Please select an FSL user.");
      return;
    }
    setLoading(true);
    try {
      await api.post(`/custody/${evidence._id}/transfer`, {
        toUserId: toUser,
        action: "Transferred",
      });
      onTransferred();
      alert("Evidence transferred successfully!");
    } catch (error) {
      setErr(error.response?.data?.msg || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show onHide={onHide} centered>
      <form onSubmit={handleTransfer}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Evidence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Case:</strong> {evidence.caseId}
          </p>
          <p>{evidence.description}</p>
          {err && <div className="alert alert-danger">{err}</div>}

          <div className="mb-3">
            <label className="form-label">Select FSL User</label>
            <select
              className="form-select"
              value={toUser}
              onChange={(e) => setToUser(e.target.value)}
              required
              disabled={!users.length}
            >
              {users.length === 0 ? (
                <option value="">No FSL users found</option>
              ) : (
                users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))
              )}
            </select>
            {!users.length && (
              <small className="text-muted">
                Ask admin to create FSL users.
              </small>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="warning"
            type="submit"
            disabled={loading || !users.length}
          >
            {loading ? "Transferring..." : "Transfer"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

