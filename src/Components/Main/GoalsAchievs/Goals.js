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
    allAchievs: null,
    allTasks: null
  });

  let location = props.location.pathname;

  useEffect(() => {
    const currentUser = () => {
      Promise.all([
        axios.get('/api/user/current', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/levels'),
        axios.get('/api/achievs/user', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/achievs'),
        axios.get('/api/tasks')
      ])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          let allUserAchievs = all[2].data;
          let allAchievements = all[3].data;
          let allTasks = all[4].data;
          setUser((...prev) => ({
            info: all[0].data,
            levelInfo: level.xp,
            goals: allUserAchievs,
            allAchievs: allAchievements,
            allTasks: allTasks
          }));
        });
    };
    currentUser();
  }, [location]);


  const achievs = user.info && user.allAchievs.map((achievs, i) => {
    const goal = user.goals[i];
    console.log("FASDFASDFASFD", achievs);
    let taskCompletionAmount = ((goal.times_completed / achievs.amount_to_complete).toFixed(2)) * 100;
    let goalCompleted = false;
    if (taskCompletionAmount >= 100) {
      goalCompleted = true;
      taskCompletionAmount = 100;
    }
    return (
      <GoalButton
        key={achievs.id}
        id={achievs.id}
        taskTitle={achievs.name}
        progress={taskCompletionAmount}
        taskCompletionAmount={`${taskCompletionAmount}%`}
        description={achievs.description}
        goalCompleted={goalCompleted}
      />
    );
  });

  return (
    <section className="main">
      <div className="tasks-main">
        <FadeIn>
          <div className="task-container">
            {user.info && achievs}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Goals;
