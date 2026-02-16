import { Navigate } from "react-router-dom";
import { getToken } from "./auth";

export default function PrivateRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
