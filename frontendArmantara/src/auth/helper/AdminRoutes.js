import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const authed = isAuthenticated();

  if (!authed || (authed && authed.user.role !== 1)) {
    navigate("/signin", { replace: true });
    return null; // or a loading spinner or a message
  }

  return <Route {...rest} element={<Component />} />;
};

export default AdminRoute;
