import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const { authUser } = useContext(AuthUserContext);

  useEffect(() => {
    if (!authUser) {
      history.push({
        pathname: ROUTES.SIGN_IN,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <Route
      {...rest}
      render={(routeProps) => (authUser ? <Component {...routeProps} /> : null)}
    />
  );
};

export default PrivateRoute;
