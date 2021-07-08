import React, { useContext, useState } from "react";
import { FirebaseContext } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

const PasswordChangeForm = () => {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const firebase = useContext(FirebaseContext);

  const handleChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      ...{ [event.target.name]: event.target.value },
    }));
  };

  const handleSubmit = (event) => {
    firebase
      .doPasswordUpdate(formState.passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        setFormState((prevState) => ({ ...prevState, ...{ error } }));
      });

    event.preventDefault();
  };

  const isInvalid =
    formState.passwordOne !== formState.passwordTwo ||
    formState.passwordOne === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="passwordOne"
        value={formState.passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={formState.passwordTwo}
        onChange={handleChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {formState.error && <p>{formState.error.message}</p>}
    </form>
  );
};

export { PasswordChangeForm };
