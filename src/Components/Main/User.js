import React, { useRef, useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";

import "./main.scss";


function User() {
  let [progress, setProgress] = useState(100);

  function getUserXP(username) {
    axios.get('http://localhost:8001/api/users')
      .then(response => {
        response.data.forEach(user => {
          if (username === user.username.toUpperCase()) {
            return user.experience_points;
          }
        });
      });
  }

  let theCircle = (el) => {
    console.log("theCircle", el);
    let circle = el;
    let radius = circle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    function setTheProgress(percent) {
      console.log("percent", percent);
      const offset = circumference - percent / 100 * circumference;
      circle.style.strokeDashoffset = offset;
      setProgress(percent);
    };
    // TIMEOUT TO ANIMATE XP BAR
    setTimeout(() => {
      setTheProgress(66); // XP SHOULD BE PASSED HERE
    }, 350);
    // for using an INPUT to change XP... DEV MODE
    // const input = document.querySelector('input');
    // setTheProgress(input.value);
    // setTheProgress(100);
    // input.addEventListener('change', function (e) {
    //   if (input.value < 101 && input.value > -1) {
    //     setTheProgress(input.value);
    //   }
    // });
  };

  // WRONG INFO: NEEDS LEVEL'S TOTAL XP AMOUNT, NOT 100 or PROGRESS
  const nextLevelDisplay = () => {
    return (
      <div className="next-level-display">
        <p>{`Next level in ${100 - progress} points`}</p>
      </div>
    );
  };

  let circleRef = useRef();

  useEffect(() => {
    theCircle(circleRef.current);
  }, [progress]);



  return (
    <section className="user">
      <div className="main">
        <FadeIn>
          <svg
            className="progress-ring"
            width="600"
            height="600">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#65c0e0" />
                <stop offset="25%" stop-color="#e9a5a5" />
                <stop offset="40%" stop-color="#b8c135" />
                <stop offset="50%" stop-color="#81c1d9" />
                <stop offset="100%" stop-color="#aea2db" />
              </linearGradient>
            </defs>
            <circle
              ref={circleRef}
              className="progress-ring__circle"
              stroke="white"
              strokeWidth="8"
              fill="transparent"
              r="284"
              cx="300"
              cy="300" />
          </svg>

          {/* DEV MODE */}
          {/* <input
          value={progress}
          onChange={(event) => setProgress(event.target.value)}
          type="number"
          step="5"
          min="0"
          max="100"
          placeholder="progress"
        /> */}
        </FadeIn>
        {nextLevelDisplay()}
      </div>
    </section>
  );
};

export default User;
