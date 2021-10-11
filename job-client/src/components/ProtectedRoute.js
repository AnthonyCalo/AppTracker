import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  let other_props = {...restOfProps}
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        other_props.isAuth ? <Component {...restOfProps} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;