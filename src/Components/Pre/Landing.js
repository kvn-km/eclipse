import React from "react";
import logo from "../../logo.png";
import FadeIn from "react-fade-in";
import "../Main/main.scss";

function Landing() {
  return (
    <header className="user landing">
      <FadeIn>
        <img src={logo} className="App-logo" alt="logo" />
      </FadeIn>
    </header>
  );
}

export default Landing;
