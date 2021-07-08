import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext, PrivateRoute } from "../Session";

const App = () => {
  const [authUser, setAuthUser] = useState({ authUser: null });
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((res) => {
      // Set/remove a token on localStorage
      res ? setAuthUser({ authUser: res }) : setAuthUser({ authUser: null });
    });
    return () => {
      listener();
    };
  }, [firebase]);

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <div>
          <Navigation />
          <hr />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          {/* Private Routes */}
          <PrivateRoute path={ROUTES.HOME} component={HomePage} />
          <PrivateRoute path={ROUTES.ACCOUNT} component={AccountPage} />
          <PrivateRoute path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    </AuthUserContext.Provider>
  );
};

export default App;
