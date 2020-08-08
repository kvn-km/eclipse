import React, { useRef, useEffect, useState } from "react";
import FadeIn from "react-fade-in";


import "./taskButton.scss";

function GoalButton(props) {
  const [progress, setProgress] = useState(0);

  console.log("TEMPVAR", props);

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
        if (percent === 0) {
          const offset = circumference - 100 / 100 * circumference;
          circle.style.strokeDashoffset = offset;
        } else {
          const offset = circumference - percent / 100 * circumference;
          circle.style.strokeDashoffset = offset;
        }
        mounted && setProgress(percent);
      };
      // TIMEOUT TO ANIMATE XP BAR
      setTimeout(() => {
        setTheProgress(props.progress); // XP SHOULD BE PASSED HERE
      }, 350);
    };
    theCircle(circleRef.current);
    return () => { mounted = false; };
  }, [props.progress, progress]);

  const stopColour = {
    offset0: "#65c0e0",
    offset25: "#e9a5a5",
    offset50: "#b8c135",
    offset75: "#81c1d9",
    offset100: "#aea2db",
  };
  const stopColourBW = {
    offset0: "#666666",
    offset25: "#000",
    offset50: "#000",
    offset75: "#000",
    offset100: "#666666"
  };

  return (
    <div>
      <article className="goal-button" >
        <FadeIn>
          <div className="task-button-el">
            <p>{props.taskTitle}</p>
            <svg
              className="progress-ring"
              width="200"
              height="200"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={props.progress > 0 ? stopColour.offset0 : stopColourBW.offset0} />
                  <stop offset="25%" stopColor={props.progress > 0 ? stopColour.offset25 : stopColourBW.offset25} />
                  <stop offset="40%" stopColor={props.progress > 0 ? stopColour.offset50 : stopColourBW.offset50} />
                  <stop offset="50%" stopColor={props.progress > 0 ? stopColour.offset75 : stopColourBW.offset75} />
                  <stop offset="100%" stopColor={props.progress > 0 ? stopColour.offset100 : stopColourBW.offset100} />
                </linearGradient>
              </defs>
              <circle
                ref={circleRef}
                className="progress-ring__circle"
                stroke="white"
                strokeWidth="10"
                fill="transparent"
                r="95"
                cx="100"
                cy="100" />
            </svg>
          </div>
          <div className={props.taskCompletionAmount === "100%" ? "task-completed-amount" : "task-completion-amount"}>
            <p>{props.taskCompletionAmount === "100%" ? `completed` : props.taskCompletionAmount}</p>
          </div>
        </FadeIn>
      </article>
    </div>
  );
};

export default GoalButton;
