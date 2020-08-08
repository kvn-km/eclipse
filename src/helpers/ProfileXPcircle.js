import React, { useRef, useEffect, useState } from "react";
import FadeIn from "react-fade-in";

import "../Components/Main/TaskButtons/taskButton.scss";

function ProfileXPcircle(props) {
  const [progress, setProgress] = useState(0);

  console.log("TEMPVAR", progress);

  let circleRef = useRef();
  useEffect(() => {
    let mounted = true;
    let theCircle = (el) => {
      let circle = el;
      let radius = circle.r.baseVal.value;
      let circumference = radius * 2 * Math.PI;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
      function setTheProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
        mounted && setProgress(percent);
      };
      // TIMEOUT TO ANIMATE XP BAR
      setTimeout(() => {
        setTheProgress(props.progress); // XP SHOULD BE PASSED HERE
      }, 350);
    };
    theCircle(circleRef.current);
    return () => { mounted = false; };
  }, [props.progress]);


  return (
    <article className="task-button xpxp">
      <FadeIn>
        <div className="task-button-el">
          <svg
            className="progress-ring"
            width="200"
            height="200">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#65c0e0" />
                <stop offset="25%" stopColor="#e9a5a5" />
                <stop offset="40%" stopColor="#b8c135" />
                <stop offset="50%" stopColor="#81c1d9" />
                <stop offset="100%" stopColor="#aea2db" />
              </linearGradient>
            </defs>
            <circle
              ref={circleRef}
              className="progress-ring__circle"
              stroke="white"
              strokeWidth="4"
              fill="transparent"
              r="92"
              cx="100"
              cy="100" />
          </svg>
        </div>
        <div className="task-completion-amount">
          <p>{props.taskCompletionAmount}</p>
        </div>
      </FadeIn>
    </article>
  );
}

export default ProfileXPcircle;
