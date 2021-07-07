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
import { AuthUserContext } from "../Session";

const App = () => {
  const [authUser, setAuthUser] = useState({ authUser: null });
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((res) => {
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
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    </AuthUserContext.Provider>
  );
};

export default App;
