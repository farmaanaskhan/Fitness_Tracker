import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Planner from "./pages/Planner/Planner";
import Tracker from "./pages/Tracker/Tracker";
import Goals from "./pages/Goals/Goals";
import { useAuth } from "./hooks/useAuth";
import AppLayout from "./layouts/AppLayout";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="planner" element={<Planner />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="goals" element={<Goals />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
