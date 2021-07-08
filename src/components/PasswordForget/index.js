import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../Firebase";

const PasswordForget = () => {
  return (
    <div>
      <h1>PasswordForget</h1>
      <PasswordForgetForm />
    </div>
  );
};

const PasswordForgetForm = () => {
  const INITIAL_STATE = {
    email: "",
    error: null,
  };
  const [formState, setFormState] = useState(INITIAL_STATE);
  const firebase = useContext(FirebaseContext);

  const handleSubmit = (event) => {
    firebase
      .doPasswordReset(formState.email)
      .then(() => {
        setFormState({ ...INITIAL_STATE });
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

  const isInvalid = formState.email === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={formState.email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {formState.error && <p>{formState.error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export { PasswordForgetLink, PasswordForgetForm };

export default PasswordForget;
