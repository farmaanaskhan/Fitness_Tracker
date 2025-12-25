import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { attachToken } from "../services/api";

export default function AppLayout() {
  const { user, setToken } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    attachToken(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-6">Fitness</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="py-2 px-3 rounded hover:bg-slate-50">
            Dashboard
          </Link>
          <Link to="/planner" className="py-2 px-3 rounded hover:bg-slate-50">
            Planner
          </Link>
          <Link to="/tracker" className="py-2 px-3 rounded hover:bg-slate-50">
            Tracker
          </Link>
          <Link to="/goals" className="py-2 px-3 rounded hover:bg-slate-50">
            Goals
          </Link>
        </nav>
        <div className="mt-6">
          <button onClick={logout} className="text-sm text-red-600">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
