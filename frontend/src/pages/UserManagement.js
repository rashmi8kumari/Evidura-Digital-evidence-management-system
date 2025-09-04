// src/pages/UserManagement.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "police", password: "" });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/users", form);
      setForm({ name: "", email: "", role: "police", password: "" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.msg || "Add failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.msg || "Delete failed");
    }
  };

  const handleReset = async (id) => {
    try {
      await api.put(`/admin/users/${id}/reset`, { password: "123456" });
      alert("Password reset to 123456");
    } catch (err) {
      alert(err.response?.data?.msg || "Reset failed");
    }
  };

  return (
    <div>
      <h3 className="mb-3">User Management</h3>

      {/* Add User Form */}
      <form className="row g-2 mb-4" onSubmit={handleAdd}>
        <div className="col-md-2">
          <input className="form-control" placeholder="Name" required
                 value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Email" type="email" required
                 value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="police">Police</option>
            <option value="fsl">FSL</option>
            <option value="court">Court</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="col-md-3">
          <input type="password" className="form-control" placeholder="Password" required
                 value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100">Add</button>
        </div>
      </form>

      {/* Users Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="table table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th><th>Email</th><th>Role</th><th style={{width: 220}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center p-4">Loading...</td></tr>
              ) : users.length ? users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className="badge bg-secondary text-uppercase">{u.role}</span></td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleReset(u._id)}>
                      Reset Password
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="text-center p-4">No users</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
