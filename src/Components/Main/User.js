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



  // WRONG INFO: NEEDS LEVEL'S TOTAL XP AMOUNT, NOT 100 or PROGRESS
  const nextLevelDisplay = () => {
    console.log(user);
    return (
      <div className="next-level-display">
        <p>{`Next level in ${Math.floor(user.levelInfo - user.info.xp)} points`}</p>
      </div>
    );
  };

  // FIND WHERE TO RENDER CIRCLE
  let circleRef = useRef();

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
    offset0: "#666666",
    offset25: "#000",
    offset50: "#000",
    offset75: "#000",
    offset100: "#666666"
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
              ref={circleRef}
              className="progress-ring__circle"
              stroke="white"
              strokeWidth="20"
              fill="transparent"
              r="260"
              cx="300"
              cy="300" />
          </svg>
        </FadeIn>
        {user.info && nextLevelDisplay()}
      </div>
    </section>
  );
};

export default User;
