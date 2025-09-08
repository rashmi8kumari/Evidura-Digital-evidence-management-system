// src/pages/UserManagement.js
import React, { useEffect, useState } from "react";
import { api } from "../utils/auth";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "police",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setErr(err.response?.data?.msg || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");
    try {
      await api.post("/admin/users", form);
      setForm({ name: "", email: "", role: "police", password: "" });
      setOk("User added successfully");
      fetchUsers();
    } catch (err) {
      setErr(err.response?.data?.msg || "Add failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      setErr(err.response?.data?.msg || "Delete failed");
    }
  };

  const handleReset = async (id) => {
    try {
      await api.put(`/admin/users/${id}/reset`, { password: "123456" });
      alert("Password reset to 123456");
    } catch (err) {
      setErr(err.response?.data?.msg || "Reset failed");
    }
  };

  const cardStyle = {
    backgroundColor: "#2f2f2f", // dark grey
    color: "#ffffff",
    border: "none"
  };

  return (
    <div className="p-3">
      <h3 className="mb-3 text-white">User Management</h3>

      {/* Add User Form */}
      <div className="card shadow-sm mb-4" style={cardStyle}>
        <div className="card-body">
          <h5 className="card-title mb-3 text-white">Add New User</h5>

          {err && <div className="alert alert-danger">{err}</div>}
          {ok && <div className="alert alert-success">{ok}</div>}

          <form className="row g-3" onSubmit={handleAdd}>
            <div className="col-md-3">
              <div className="form-floating">
                <input
                  className="form-control"
                  id="name"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
                <label htmlFor="name">Full Name</label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-floating">
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="role"
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                >
                  <option value="police">Police</option>
                  <option value="fsl">FSL</option>
                  <option value="court">Court</option>
                  <option value="admin">Admin</option>
                </select>
                <label htmlFor="role">Role</label>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-success w-100" type="submit">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Users Table */}
      <div className="card shadow-sm" style={cardStyle}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-white">
            <thead style={{ backgroundColor: "#3a3a3a" }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ width: 220 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : users.length ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className="badge bg-info text-dark text-uppercase px-2 py-1">
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => handleReset(u._id)}
                      >
                        Reset Password
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(u._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No users found
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

export default UserManagement;





