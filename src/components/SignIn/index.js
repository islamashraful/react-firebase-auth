import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import { PasswordForgetLink } from "../PasswordForget";
import { SignUpLink } from "../SignUp";
import * as ROUTES from "../../constants/routes";

const SignIn = () => {
  return (
    <div>
      <h1>SignIn</h1>
      <PasswordForgetLink />
      <SignInForm />
      <SignUpLink />
    </div>
  );
};

const SignInForm = () => {
  const INITIAL_STATE = {
    email: "",
    password: "",
    error: null,
  };
  const [formState, setFormState] = useState(INITIAL_STATE);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const handleChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      ...{ [event.target.name]: event.target.value },
    }));
  };

  const isInvalid = formState.password === "" || formState.email === "";

  const handleSubmit = (event) => {
    firebase
      .doSignInWithEmailAndPassword(formState.email, formState.password)
      .then(() => {
        setFormState(INITIAL_STATE);
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setFormState((prevState) => ({ ...prevState, ...{ error } }));
      });
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={formState.email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={formState.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {formState.error && <p>{formState.error.message}</p>}
    </form>
  );
};

export default SignIn;
