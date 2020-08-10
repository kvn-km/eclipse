import React, { useRef, useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";

import "./main.scss";


function User(props) {
  let [user, setUser] = useState({ info: null, levelInfo: null });
  let [progress, setProgress] = useState(0);


  // SETS THE CURRENT USER 
  useEffect(() => {
    let mounted = true;
    const currentUser = () => {
      Promise.all([axios.get('/api/user/current', { params: { id: props.match.params.user_id } }), axios.get('/api/levels')])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          mounted && setUser((prev) => ({ ...prev, info: all[0].data, levelInfo: level.xp }));
        });
    };
    currentUser();
    return () => { mounted = false; };
  }, [props.match.params.user_id]);

  const currentXPDisplay = () => {
    if (user.info.xp === user.levelInfo) {
      return (
        <p className="currentXPDisplay-levelUp">
          level up!
        </p>
      );
    } else {
      return (
        <p className="currentXPDisplay">
          xp<br />
          {user.info.xp} / {user.levelInfo}
        </p>
      );
    }
  };
  const nextLevelDisplay = () => {
    const remainingXP = Math.floor(user.levelInfo - user.info.xp);
    if (remainingXP === 0) {
      return (
        <div className="next-level-display">
          <p>{``}</p>
        </div>
      );
    } else {
      return (
        <div className="next-level-display">
          <p>{`Next level in ${remainingXP} points`}</p>
        </div>
      );
    }
  };

  // FIND WHERE TO RENDER CIRCLE
  let circleRef = useRef();
  let circleRef2 = useRef();

  // CREATE THE CIRCLE
  useEffect(() => {
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
        setProgress(percent);
      };
      // DUE TO MULTIPLE RENDERS, THIS RENDERS THE CIRCLE ONCE A USER INFO IS LOADED
      if (user.info) {
        let percent = (user.info.xp / user.levelInfo) * 100;
        // TIMEOUT TO ANIMATE XP BAR
        setTimeout(() => {
          setTheProgress(percent);
        }, 350);
      }
    };
    theCircle(circleRef.current);
  }, [user.info, user.levelInfo, progress]);

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

  const thinLineStyle = {
    "strokeDasharray": "10 0",
    "transition": "stroke-dashoffset 0.35s",
    "transform": "rotate(-90deg)",
    "transformOrigin": "50% 50%",
    "opacity": "0.25"
  };
  const noLineStyle = {
    "strokeDasharray": "10 0",
    "transition": "stroke-dashoffset 0.35s",
    "transform": "rotate(-90deg)",
    "transformOrigin": "50% 50%",
    "opacity": "0"
  };

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
                <stop offset="0%" stopColor={user.info && user.info.xp > 0 ? stopColour.offset0 : stopColourBW.offset0} />
                <stop offset="25%" stopColor={user.info && user.info.xp > 0 ? stopColour.offset25 : stopColourBW.offset25} />
                <stop offset="40%" stopColor={user.info && user.info.xp > 0 ? stopColour.offset50 : stopColourBW.offset50} />
                <stop offset="50%" stopColor={user.info && user.info.xp > 0 ? stopColour.offset75 : stopColourBW.offset75} />
                <stop offset="100%" stopColor={user.info && user.info.xp > 0 ? stopColour.offset100 : stopColourBW.offset100} />
              </linearGradient>
            </defs>
            <circle
              ref={circleRef2}
              stroke="white"
              strokeWidth="1"
              fill="transparent"
              r="260"
              cx="300"
              cy="300"
              style={user.info && user.info.xp === 0 ? noLineStyle : thinLineStyle} />
            <circle
              ref={circleRef}
              className="progress-ring__circle"
              stroke="white"
              strokeWidth="20"
              fill="transparent"
              r="260"
              cx="300"
              cy="300" />
          </svg>
          <div className="task-completion-amount-profile">
            {user.info && currentXPDisplay()}
          </div>
        </FadeIn>
        {user.info && nextLevelDisplay()}
      </div>
    </section>
  );
};

export default User;
