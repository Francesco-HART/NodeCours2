import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../services/store/authContext";
function RequireAuth({ component }) {
  let authContext = useContext(AuthContext);

  if (!authContext.authUser.isLoggedIn) return <Navigate to="login" />;

  return component;
}

export default RequireAuth;
