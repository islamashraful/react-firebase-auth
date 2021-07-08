import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../Firebase";

const Admin = () => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState({ loading: false, users: [] });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, ...{ loading: true } }));

    firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();

      const users = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      setState({ users, loading: false });
    });

    return () => {
      firebase.users().off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      {state.loading && <h2>Loading ...</h2>}

      <ul>
        {state.users.map((user) => (
          <li key={user.uid}>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
