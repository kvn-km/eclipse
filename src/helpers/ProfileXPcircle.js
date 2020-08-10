import React, { useRef, useEffect, useState } from "react";
import FadeIn from "react-fade-in";

import "../Components/Main/TaskButtons/taskButton.scss";

function ProfileXPcircle(props) {
  const [progress, setProgress] = useState(0);

  let circleRef = useRef();
  let circleRef2 = useRef();
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
      setTimeout(() => {
        setTheProgress(props.progress);
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
    offset0: "#6666664d",
    offset25: "#0000001c",
    offset50: "#00000080",
    offset75: "#0000001c",
    offset100: "#6666664d"
  };

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
                <stop offset="0%" stopColor={props.progress > 0 ? stopColour.offset0 : stopColourBW.offset0} />
                <stop offset="25%" stopColor={props.progress > 0 ? stopColour.offset25 : stopColourBW.offset25} />
                <stop offset="40%" stopColor={props.progress > 0 ? stopColour.offset50 : stopColourBW.offset50} />
                <stop offset="50%" stopColor={props.progress > 0 ? stopColour.offset75 : stopColourBW.offset75} />
                <stop offset="100%" stopColor={props.progress > 0 ? stopColour.offset100 : stopColourBW.offset100} />
              </linearGradient>
            </defs>
            <circle
              ref={circleRef2}
              className="progress-ring__circle2"
              stroke="white"
              strokeWidth="0.5"
              fill="transparent"
              r="95"
              cx="100"
              cy="100" />
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
        <div className="task-completion-amount-profile">
          <p>xp <br />{props.taskCompletionAmount}</p>
        </div>
      </FadeIn>
    </article>
  );
}

export default ProfileXPcircle;
