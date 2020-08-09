import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import FadeIn from "react-fade-in";
import axios from 'axios';

function SignUp(props) {
  let [redirect, setRedirect] = useState({
    path: "/login",
    user_id: null
  });
  let [fullname, setFullname] = useState(props.fullname || "");
  let [email, setEmail] = useState(props.email || "");
  let [username, setUsername] = useState(props.username || "");
  let [password, setPassword] = useState(props.password || "");
  let [signupType, setSignupType] = useState("FULLNAME");
  let [newUser, setNewUser] = useState({ name: "", password: "", email: "", username: "" });

  const autofocus = useCallback(el => el ? el.focus() : null, []);

  if (redirect.user_id) {
    return <Redirect to={`${redirect.path}/${redirect.user_id}`} />;
  }

  function addUser(name, password, email, username) {
    axios.post('/api/users', { params: { name: name, password: password, email: email, username: username } })
      .then(response => {
        let newState = { path: "/user", user_id: response.data.id };
        setRedirect((prev) => ({ ...prev, ...newState }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  const signupTypeFullname = () => {
    return (
      <FadeIn>
        <div className="login-type">Full Name</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              setNewUser((prev) => ({ ...prev, name: fullname }));
              setSignupType("EMAIL");
            }}>
            <input
              ref={autofocus}
              className="login-input"
              name="fullname"
              type="text"
              placeholder=""
              value={fullname}
              onChange={(event) => setFullname(event.target.value)}
              onInput={toInputUppercase}
            />
          </form>
        </section>
      </FadeIn>
    );
  };

  const signupTypeEmail = () => {
    return (
      <FadeIn>
        <div className="login-type">Email</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              setNewUser((prev) => ({ ...prev, email: email }));
              setSignupType("USERNAME");
            }}>
            <input
              ref={autofocus}
              className="login-input"
              name="email"
              type="email"
              placeholder=""
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onInput={toInputUppercase}
            />
          </form>
        </section>
      </FadeIn>
    );
  };

  const signupTypeUsername = () => {
    return (
      <FadeIn>
        <div className="login-type">Username</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              setNewUser((prev) => ({ ...prev, username: username }));
              setSignupType("PASSWORD");
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

  const signupTypePass = () => {
    return (
      <FadeIn>
        <div className="login-type">password</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              setNewUser((prev) => ({ ...prev, password: password }));
              addUser(newUser.name, password, newUser.email, newUser.username);
            }}>
            <input
              ref={autofocus}
              className="login-input"
              name="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
        </section>
      </FadeIn>
    );
  };

  return (
    <main className="login pre">
      {signupType === "FULLNAME" && signupTypeFullname()}
      {signupType === "EMAIL" && signupTypeEmail()}
      {signupType === "USERNAME" && signupTypeUsername()}
      {signupType === "PASSWORD" && signupTypePass()}

    </main>
  );
}

export default SignUp;
