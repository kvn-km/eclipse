import React, { useRef, useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";

import "./main.scss";


function User(props) {
  let [user, setUser] = useState({ info: null, levelInfo: null });
  let [progress, setProgress] = useState(0);

  const currentUser = () => {
    Promise.all([axios.get('http://localhost:8001/api/user/current', { params: { id: props.match.params.username } }), axios.get('http://localhost:8001/api/levels')])
      .then((all) => {
        let level = all[1].data[all[0].data.level - 1];
        setUser((prev) => ({ ...prev, info: all[0].data, levelInfo: level.xp }));
      });
  };

  // SETS THE CURRENT USER 
  useEffect(() => {
    currentUser();
  }, []);

  let theCircle = (el) => {
    let circle = el;
    let radius = circle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    function setTheProgress(percent) {
      const offset = circumference - percent / 100 * circumference;
      circle.style.strokeDashoffset = offset;
      setProgress(percent);
    };
    // DUE TO MULTIPLE RENDERS, THIS RENDERS THE CIRCLE ONCE A USER INFO IS LOADED
    if (user.info) {
      console.log("CURRENT USER", user);
      let percent = (user.info.xp / user.levelInfo) * 100;
      // TIMEOUT TO ANIMATE XP BAR
      setTimeout(() => {
        setTheProgress(percent);
      }, 350);
    }
  };

  // WRONG INFO: NEEDS LEVEL'S TOTAL XP AMOUNT, NOT 100 or PROGRESS
  const nextLevelDisplay = () => {
    return (
      <div className="next-level-display">
        <p>{`Next level in ${100 - progress} points`}</p>
      </div>
    );
  };

  // FIND WHERE TO RENDER CIRCLE
  let circleRef = useRef();

  // CREATE THE CIRCLE
  useEffect(() => {
    theCircle(circleRef.current);
  }, [user]);


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
              strokeWidth="8"
              fill="transparent"
              r="284"
              cx="300"
              cy="300" />
          </svg>
        </FadeIn>
        {nextLevelDisplay()}
      </div>
    </section>
  );
};

export default User;
