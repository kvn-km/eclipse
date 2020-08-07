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
    allAchievs: []
  });

  console.log("TEMPVAR", user);

  let location = props.location.pathname;

  useEffect(() => {
    let mounted = true;
    const currentUser = () => {
      Promise.all([
        axios.get('/api/user/current', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/levels'),
        axios.get('/api/tasks/user', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/tasks/side')])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          let allUserTasks = all[2].data;
          let allTasks = all[3].data;
          mounted && setUser((...prev) => ({
            info: all[0].data,
            levelInfo: level.xp,
            tasks: allUserTasks,
            allTasks: allTasks
          }));
        });
    };
    currentUser();
    return () => { mounted = false; };
  }, [location]);

  // const tasks = user.allTasks.map((task, i) => {
  //   const userTask = user.tasks[i + 8];
  //   return (
  //     <TaskButton
  //       key={task.id}
  //       id={task.id}
  //       link={"/user/2/task"}
  //       taskTitle={task.name}
  //       progress={userTask.progress}
  //       taskCompletionAmount={`${userTask.progress}%`}
  //       description={task.description}
  //     />

  //   );
  // });

  const tasks = mockData.map((task) => {
    return (
      <Achievs
        key={task.id}
        id={task.id}
        link={task.link}
        taskTitle={task.taskTitle}
        className={"progress-ring__circle profile-circle"}
        description={task.description}
      />
    );
  });

  return (
    <section className="main">
      <div className="tasks-main">
        <FadeIn>

          <div className="task-container">
            {tasks}
          </div>

        </FadeIn>
      </div>
    </section>
  );
}

export default Profile;
