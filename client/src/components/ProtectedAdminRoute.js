import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

function ProtectedAdminRoute({ children }) {
  if (!isAdmin()) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export default ProtectedAdminRoute;
