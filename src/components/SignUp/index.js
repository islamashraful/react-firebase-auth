import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUp = () => {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

const SignUpForm = () => {
  const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null,
  };
  const [formState, setFormState] = useState(INITIAL_STATE);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    firebase
      .doCreateUserWithEmailAndPassword(formState.email, formState.passwordOne)
      .then((authUser) => {
        setFormState(INITIAL_STATE);
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setFormState((prevState) => ({ ...prevState, ...{ error } }));
      });
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      ...{ [event.target.name]: event.target.value },
    }));
  };

  const isInvalid =
    formState.passwordOne !== formState.passwordTwo ||
    formState.passwordOne === "" ||
    formState.email === "" ||
    formState.username === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formState.username}
        onChange={handleChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={formState.email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={formState.passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={formState.passwordTwo}
        onChange={handleChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {formState.error && <p>{formState.error.message}</p>}
    </form>
  );
};

export default SignUp;
