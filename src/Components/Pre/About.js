import React from "react";
import FadeIn from "react-fade-in";

import "./pre.scss";

function About() {
  return (
    <section className="about pre">
      <FadeIn>
        Eclipse
        <h1>Life RPG</h1>
        <p>
          When life as we knew it changed due to quarantine, we began to run out of things to do. Eclipse was inspired by the idea that we still need to do daily tasks everyday. Instead of just completing them because life depends on it, you can log them in the app!
        </p>
        <p>
          Eclipse is a full-stack web application built with Node JS, React, Express, PostgresSQL and Google's Teachable Machine (with the PoseNet model). This project is an interactive web-based application designed to capture your everyday actions in the way of a role-playing game using the user's webcam.
          </p>
        <p>
          Users can create an account and begin their adventure right away.
        </p>
      </FadeIn>
    </section>
  );
}

export default About;
