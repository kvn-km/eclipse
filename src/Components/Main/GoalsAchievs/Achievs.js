import React, { useRef, useEffect, useState } from "react";
import FadeIn from "react-fade-in";

import "./achievs.scss";

function Achievs(props) {
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
          const offset = circumference - 0 / 100 * circumference;
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
  }, [progress, props.progress]);

  return (
    <div>
      <article className="task-button-achiev" >
        <FadeIn>
          <div className="task-button-el" >
            <p>{props.achievTitle}</p>
            <svg
              className="progress-ring"
              width="150"
              height="150"
            >
              <defs>
                <linearGradient id="gradientAchiev" x1="0%" y1="0%" x2="100%" y2="0%">
                  {/* <stop offset="0%" stopColor={props.progress > 0 ? stopColour.offset0 : stopColourBW.offset0} /> */}
                  <stop offset="0%" stopColor="#e9a5a5" />
                  <stop offset="40%" stopColor="#65c0e0" />
                  <stop offset="50%" stopColor="#aea2db" />
                  <stop offset="60%" stopColor="#81c1d9" />
                  <stop offset="100%" stopColor="#b8c135" />
                </linearGradient>
              </defs>
              <circle
                ref={circleRef}
                className="progress-ring__circle profile-circle"
                stroke="white"
                strokeWidth="0"
                fill="transparent"
                r="75"
                cx="75"
                cy="75" />
            </svg>
          </div>
        </FadeIn>
      </article>
    </div>
  );
}

export default Achievs;
