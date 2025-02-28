import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute checks if the user is authenticated before rendering a component
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
