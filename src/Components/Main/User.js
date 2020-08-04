import React, { useRef, useState, useEffect } from "react";

import "./main.scss";

import Sidebar from "../Nav/Sidebar";

function User() {
  const [progress, setProgress] = useState(100);

  let asdf = (el) => {
    console.log("asdf", el);
    let circle = el;
    let radius = circle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setTheProgress(percent) {
      const offset = circumference - percent / 100 * circumference;
      circle.style.strokeDashoffset = offset;
    }

    const input = document.querySelector('input');
    // setTheProgress(input.value);
    setTheProgress(25
    );

    input.addEventListener('change', function (e) {
      if (input.value < 101 && input.value > -1) {
        setTheProgress(input.value);
      }
    });
  };
  let circleRef = useRef();
  useEffect(() => {
    asdf(circleRef.current);
  }, []);

  return (
    <section className="user">
      <div className="main">
        <Sidebar />

        <svg
          className="progress-ring"
          width="600"
          height="600">
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
        <input
          value={progress}
          onChange={(event) => setProgress(event.target.value)}
          type="number"
          step="5"
          min="0"
          max="100"
          placeholder="progress"
        />

      </div>
    </section>
  );
};

export default User;
