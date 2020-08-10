import React from "react";
import logo from "../../logo.png";
import FadeIn from "react-fade-in";
import "../Main/main.scss";

function Landing() {
  return (
    <header className="user landing">
      <div className="landing-container">
        <FadeIn>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="task-completion-amount-landing">
            <p className="welcome">Welcome to</p><p className="landing-strong">Eclipse</p>
          </div>
        </FadeIn>
      </div>
    </header>
  );
}

export default Landing;
