import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../services/store/authContext";

/**
 * Function who return a user to home if he is not admin
 * @param component
 * @returns {JSX.Element|*}
 * @constructor
 */
function RequireAdmin({ component }) {
  let authContext = useContext(AuthContext);

  if (!authContext.authUser.type !== "admin") return <Navigate to="/users" />;

  return component;
}

export default RequireAdmin;
