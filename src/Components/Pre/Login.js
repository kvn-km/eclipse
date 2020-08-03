import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";

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

  const loginTypeLogin = () => {
    return (
      <div>
        <div className="login-type">username</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              console.log(username);
              setLoginType("PASSWORD");
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
      </div>
    );

  };
  const loginTypePass = () => {
    return (
      <div>
        <div className="login-type">password</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              console.log(password);
              setRedirect("/user");
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
      </div>
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
