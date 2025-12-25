import React, { useState } from "react";
import { register } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { attachToken } from "../../services/api";

export default function Signup() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const { token } = await register(name, email, password);
      setToken(token);
      attachToken(token);
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h1 className="text-2xl mb-4">Sign up</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full input"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full input"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full input"
        />
        {err && <div className="text-sm text-red-600">{err}</div>}
        <button className="w-full py-2 bg-green-600 text-white rounded">
          Create account
        </button>
      </form>
    </div>
  );
}
