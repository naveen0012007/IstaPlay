import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const privateRoutes = () => {
  let auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default privateRoutes;
