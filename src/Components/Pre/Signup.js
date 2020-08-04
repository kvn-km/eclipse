import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import FadeIn from "react-fade-in";

function SignUp(props) {
  let [redirect, setRedirect] = useState("");
  let [fullname, setFullname] = useState(props.fullname || "");
  let [phone, setPhone] = useState(props.phone || "");
  let [username, setUsername] = useState(props.username || "");
  let [password, setPassword] = useState(props.password || "");
  let [signupType, setSignupType] = useState("FULLNAME");

  const autofocus = useCallback(el => el ? el.focus() : null, []);

  if (redirect) {
    return <Redirect to={redirect} />;
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
              console.log(fullname);
              setSignupType("PHONE");
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

  const signupTypePhone = () => {
    return (
      <FadeIn>
        <div className="login-type">Phone Number</div>
        <section className="login-input">
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              console.log(phone);
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
              console.log(username);
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
      </FadeIn>
    );
  };

  return (
    <main className="login pre">
      {signupType === "FULLNAME" && signupTypeFullname()}
      {signupType === "PHONE" && signupTypePhone()}
      {signupType === "USERNAME" && signupTypeUsername()}
      {signupType === "PASSWORD" && signupTypePass()}

    </main>
  );
}

export default SignUp;
