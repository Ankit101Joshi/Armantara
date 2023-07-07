import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? (
        <Element />
      ) : (
        <Navigate to="/signin" replace />
      )}
    />
  );
};

export default PrivateRoute;
