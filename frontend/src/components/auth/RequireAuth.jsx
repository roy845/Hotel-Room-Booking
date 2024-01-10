import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCheckToken from "../../hooks/useCheckToken";
import { useAuth } from "./AuthProvider";

const RequireAuth = () => {
  const { user } = useAuth();

  const location = useLocation();
  user && useCheckToken();
  if (!user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return <Outlet />;
};
export default RequireAuth;
