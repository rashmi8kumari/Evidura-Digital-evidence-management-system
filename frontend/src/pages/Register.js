// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/auth";

const roles = [
  { value: "police", label: "Police" },
  { value: "fsl", label: "FSL Lab" },
  { value: "court", label: "Court" },
  { value: "admin", label: "Admin" }
];

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "police" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr(""); setOk("");
    try {
      await api.post("/auth/register", form);
      setOk("Registration successful — please login.");
      setTimeout(()=>navigate("/login"), 1200);
    } catch (error) {
      setErr(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: 480 }}>
        <h3 className="mb-3 text-center">Register</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        {ok && <div className="alert alert-success">{ok}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-2">
            <label className="form-label">Full Name</label>
            <input name="name" className="form-control" value={form.name} onChange={onChange} required />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input name="email" className="form-control" value={form.email} onChange={onChange} type="email" required />
          </div>
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input name="password" className="form-control" value={form.password} onChange={onChange} type="password" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select name="role" className="form-select" value={form.role} onChange={onChange}>
              {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <button className="btn btn-success w-100" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;


