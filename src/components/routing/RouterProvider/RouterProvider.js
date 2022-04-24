import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";

function RouterProvider() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route path={route.path} element={route.component} key={index} />
      ))}
    </Routes>
  );
}

export default RouterProvider;
