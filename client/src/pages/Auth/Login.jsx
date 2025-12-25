import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { attachToken } from "../../services/api";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const { token } = await login(email, password);
      setToken(token);
      attachToken(token);
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
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
        <button className="w-full py-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        No account?{" "}
        <Link to="/signup" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}
