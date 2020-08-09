import React, { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";

import "./main.scss";
import "./GoalsAchievs/achievs.scss";

import Achievs from "./GoalsAchievs/Achievs";

function Profile(props) {
  let [user, setUser] = useState({
    info: null,
    levelInfo: null,
    usersAchievs: null,
    allAchievs: null
  });

  let location = props.location.pathname;

  useEffect(() => {
    let mounted = true;
    const currentUser = () => {
      Promise.all([
        axios.get('/api/user/current', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/levels'),
        axios.get('/api/achievs/user', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/achievs')
      ])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          let allUserAchievs = all[2].data;
          let allTheAchievs = all[3].data;
          mounted && setUser((...prev) => ({
            info: all[0].data,
            levelInfo: level.xp,
            usersAchievs: allUserAchievs,
            allAchievs: allTheAchievs
          }));
        })
        .catch(e => console.log("EEEEEEEEE", e));
    };
    currentUser();
    return () => { mounted = false; };
  }, [location]);

  // 
  const userAchievBadges = user.info && user.usersAchievs
    .filter((userAchiev, i) => {
      return userAchiev.times_completed / user.allAchievs[i].amount_to_complete * 100 >= 100;
    })
    .map((uA, i) => {
      const achievs = user.allAchievs[uA.achiev_id - 1];
      console.log("<><><><>", uA);
      console.log("++++++++", achievs);
      return (
        <Achievs
          key={uA.id}
          id={uA.id}
          achievTitle={achievs.name}
          description={achievs.description}
        />
      );
    });
  //

  return (
    <section className="main">
      <div className="tasks-main">
        <FadeIn>
          <div className="task-container-achiev">
            {user.info && userAchievBadges}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Profile;
