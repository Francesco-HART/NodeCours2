import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../services/store/authContext";
function RequireNoAuth({ component }) {
  let authContext = useContext(AuthContext);

  if (authContext.authUser.isLoggedIn) return <Navigate to="/" />;

  return component;
}

export default RequireNoAuth;
