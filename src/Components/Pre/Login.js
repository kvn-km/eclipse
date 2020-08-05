import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import FadeIn from "react-fade-in";
import axios from "axios";

function Login(props) {
  let [redirect, setRedirect] = useState("");
  let [username, setUsername] = useState(props.username || "");
  let [password, setPassword] = useState(props.password || "");
  let [loginType, setLoginType] = useState("LOGIN");

  const autofocus = useCallback(el => el ? el.focus() : null, []);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  function authName (username) {
    axios.get('http://localhost:8001/api/users')
      .then(response => {
        response.data.forEach(user => {
          if (username === user.name.toUpperCase()) {
            setLoginType("PASSWORD");
          }
        })
      });
  }

  function authPass (password) {
    axios.get('http://localhost:8001/api/users')
      .then(response => {
        response.data.forEach(user => {
          if (password === user.password.toUpperCase()) {
            setRedirect("/user");
          }
        })
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
              authName(username);
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
              authPass(password);
            }}>
            <input
              ref={autofocus}
              className="login-input"
              name="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onInput={toInputUppercase}
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
