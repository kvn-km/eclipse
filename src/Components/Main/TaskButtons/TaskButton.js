import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";


import "./taskButton.scss";

function TaskButton(props) {
  const [progress, setProgress] = useState(0);

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

  // const filterStyleC = {
  //   filter: "grayscale(0%)",
  //   opacity: 1
  // };
  // const filterStyleBW = {
  //   filter: "grayscale(100%)",
  //   opacity: 0.1
  // };


  return (
    <Link to={`${props.link}/${props.id}`} onClick={props.link !== undefined ? (e) => ("") : (event) => event.preventDefault()} className={props.link !== undefined ? "task-link" : "disabled-cursor"}>
      <article className="task-button" >
        <FadeIn>
          <div className="task-button-el">
            <p>{props.taskCompletionAmount === "100%" ? `reset task` : props.taskTitle}</p>
            <svg
              className="progress-ring"
              width="200"
              height="200"
            // style={progress && props.progress > 0 ? { filterStyleC } : { filterStyleBW }}
            >
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
    </Link >
  );
};

export default TaskButton;
