import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../services/store/authContext";
function RequireAdmin({ component }) {
  let authContext = useContext(AuthContext);

  if (!authContext.authUser.type !== "admin") return <Navigate to="/" />;

  return component;
}

export default RequireAdmin;
