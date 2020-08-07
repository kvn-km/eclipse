import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import FadeIn from "react-fade-in";
import axios from 'axios';

let newUser = {};

function addUser(name, password, email, phone, username) {
  axios.post('http://localhost:8001/api/users', { params: {name: name, password: password, email: email, phone: phone, username: username}})
    .then(response => {
      // console.log(response.data);
    });
}

function SignUp(props) {
  let [redirect, setRedirect] = useState("");
  let [fullname, setFullname] = useState(props.fullname || "");
  let [email, setEmail] = useState(props.email || "");
  let [phone, setPhone] = useState(props.phone || "");
  let [username, setUsername] = useState(props.username || "");
  let [password, setPassword] = useState(props.password || "");
  let [signupType, setSignupType] = useState("FULLNAME");

  const autofocus = useCallback(el => el ? el.focus() : null, []);

  if (redirect) {
    return <Redirect to={`${redirect.path}/${redirect.user_id}`} />;
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
              newUser = {};
              newUser.name = fullname
              console.log(newUser)
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
              newUser.email = email
              console.log(newUser)
              setSignupType("PHONE");
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

  const signupTypePhone = () => {
    return (
      <FadeIn>
        <div className="login-type">Phone Number</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              newUser.phone = phone
              console.log(newUser)
              setSignupType("USERNAME");
            }}>
            <input
              ref={autofocus}
              className="login-input"
              name="phone"
              type="text"
              placeholder=""
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
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
              newUser.username = username;
              console.log(newUser);
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
              newUser.password = password
              console.log(newUser);
              addUser(newUser.name, newUser.password, newUser.email, newUser.phone, newUser.username);
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
      </FadeIn>
    );
  };

  return (
    <main className="login pre">
      {signupType === "FULLNAME" && signupTypeFullname()}
      {signupType === "EMAIL" && signupTypeEmail()}
      {signupType === "PHONE" && signupTypePhone()}
      {signupType === "USERNAME" && signupTypeUsername()}
      {signupType === "PASSWORD" && signupTypePass()}

    </main>
  );
}

export default SignUp;
