import { AuthContext } from "../../../auth/AuthProvider";
import React from "react";
import { Navigate } from "react-router-dom";
import AdminLayout from "../../../layouts/admin/AdminLayout";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading....</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;