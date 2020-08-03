import React from "react";
import logo from "../../logo.png";
import FadeIn from "react-fade-in";
import "./pre.scss";

function Landing() {
  return (
    <header className="landing pre">
      <FadeIn>
        <img src={logo} className="App-logo" alt="logo" />
      </FadeIn>
    </header>
  );
}

export default Landing;
