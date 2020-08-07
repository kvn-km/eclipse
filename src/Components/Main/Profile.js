import React, { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";

import "./main.scss";
import "./GoalsAchievs/achievs.scss";
import Achievs from "./GoalsAchievs/Achievs";

const mockData = [
  {
    id: 1,
    taskTitle: "Task Title 1",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 2,
    taskTitle: "Task Title 2",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 3,
    taskTitle: "Task Title 3",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 4,
    taskTitle: "Task Title 4",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 5,
    taskTitle: "Task Title 5",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 6,
    taskTitle: "Task Title 6",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 7,
    taskTitle: "Task Title 7",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 8,
    taskTitle: "Task Title 8",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 9,
    taskTitle: "Task Title 9",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 10,
    taskTitle: "Task Title 10",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 11,
    taskTitle: "Task Title 11",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
  {
    id: 12,
    taskTitle: "Task Title 12",
    taskProgress: 100,
    description: "GREAT JOB!"
  },
];

function Profile(props) {
  let [user, setUser] = useState({ info: null, levelInfo: null });

  console.log("TEMPVAR", user);

  // let user_id = "";
  // if (props.match.url.includes("/profile")) {
  //   user_id = props.match.url.slice(6, 7);
  // }

  useEffect(() => {
    let mounted = true;
    const currentUser = () => {
      Promise.all([axios.get('/api/user/current', { params: { id: props.match.url.slice(6, 7) } }), axios.get('/api/levels')])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          mounted && setUser((prev) => ({ ...prev, info: all[0].data, levelInfo: level.xp }));
        });
    };
    currentUser();
    return () => { mounted = false; };
  }, [props.match.url]);


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
