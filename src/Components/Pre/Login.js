import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import FadeIn from "react-fade-in";
import axios from "axios";

function Login(props) {
  let [username, setUsername] = useState();
  let [redirect, setRedirect] = useState({
    path: "/login",
    user_id: null
  });
  let [password, setPassword] = useState(props.password || "");
  let [loginType, setLoginType] = useState("LOGIN");


  const autofocus = useCallback(el => el ? el.focus() : null, []);

  if (redirect.user_id) {
    return <Redirect to={`${redirect.path}/${redirect.user_id}`} />;
  }

  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  function authUser(username, password) {
    axios.get('http://localhost:8001/api/user', { params: { name: username, password: password } })
      .then(response => {
        // console.log(response.data);
        if (response.data.name !== undefined && response.data.name.toUpperCase() === username) {
          setLoginType("PASSWORD");
        }
        else if (response.data.password === password) {
          console.log('YOU ARE IN!');
          let newState = { path: "/user", user_id: response.data.id };
          setRedirect((prev) => ({ ...prev, ...newState }));
        } else {
          console.log('WRONG!');
          setLoginType("PASSWORD");
        }
      });
  }

  const loginTypeLogin = () => {
    return (
      <FadeIn>
        <div className="login-type">username</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              authUser(username, null);
            }}>
            <input
              ref={autofocus}
              className="login-input"
              name="username"
              type="text"
              placeholder=""
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onInput={toInputUppercase}
            />
          </form>
        </section>
      </FadeIn>
    );

  };
  const loginTypePass = () => {
    return (
      <FadeIn>
        <div className="login-type">password</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              authUser(null, password);
            }}>
            <input
              ref={autofocus}
              className="login-input"
              name="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            // onInput={toInputUppercase}
            />
          </form>
        </section>
      </FadeIn>
    );
  };

  return (
    <main className="login pre">

      {loginType === "LOGIN" && loginTypeLogin()}
      {loginType === "PASSWORD" && loginTypePass()}

    </main>
  );
}

export default Login;
