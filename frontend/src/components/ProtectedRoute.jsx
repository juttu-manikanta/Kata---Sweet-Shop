// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (requireAdmin && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
