import React, { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";

import GoalButton from "../TaskButtons/GoalButton";
import "../main.scss";

function Goals(props) {
  let [user, setUser] = useState({
    info: null,
    levelInfo: null,
    goals: null,
    allAchievs: []
  });

  console.log("TEMPVAR", user);

  let location = props.location.pathname;

  useEffect(() => {
    const currentUser = () => {
      Promise.all([
        axios.get('/api/user/current', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/levels'),
        axios.get('/api/achievs/user', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/achievs')])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          let allUserAchievs = all[2].data;
          let allAchievements = all[3].data;
          setUser((...prev) => ({
            info: all[0].data,
            levelInfo: level.xp,
            goals: allUserAchievs,
            allAchievs: allAchievements
          }));
        });
    };
    currentUser();
  }, [location]);


  const achievs = user.allAchievs.map((achievs, i) => {
    const goals = user.goals[i];
    return (
      <GoalButton
        key={achievs.id}
        id={achievs.id}
        taskTitle={achievs.name}
        progress={goals.progress}
        taskCompletionAmount={`${goals.progress}%`}
        description={achievs.description}
      />
    );
  });

  return (
    <section className="main">
      <div className="tasks-main">
        <FadeIn>

          <div className="task-container">
            {achievs}
          </div>

        </FadeIn>
      </div>
    </section>
  );
}

export default Goals;
