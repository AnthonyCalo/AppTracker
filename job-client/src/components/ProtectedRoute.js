import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  let other_props = {...restOfProps}
  console.log(other_props.isAuth, "OTHERPROPS Protected Route");
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