import React, { useRef, useState, useEffect } from "react";
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
    link: "/user/task"
  },
  {
    id: 2,
    taskTitle: "Task Title 2",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 3,
    taskTitle: "Task Title 3",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 4,
    taskTitle: "Task Title 4",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 5,
    taskTitle: "Task Title 5",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 6,
    taskTitle: "Task Title 6",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 7,
    taskTitle: "Task Title 7",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 8,
    taskTitle: "Task Title 8",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 9,
    taskTitle: "Task Title 9",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 10,
    taskTitle: "Task Title 10",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 11,
    taskTitle: "Task Title 11",
    taskProgress: 100,
    link: "/user/task"
  },
  {
    id: 12,
    taskTitle: "Task Title 12",
    taskProgress: 100,
    link: "/user/task"
  },
];

function Profile(props) {
  let [user, setUser] = useState({ info: null, levelInfo: null });

  const currentUser = () => {
    Promise.all([axios.get('/api/user/current', { params: { id: props.match.url.slice(6, 7) } }), axios.get('/api/levels')])
      .then((all) => {
        let level = all[1].data[all[0].data.level - 1];
        setUser((prev) => ({ ...prev, info: all[0].data, levelInfo: level.xp }));
      });
  };

  let user_id = "";
  if (props.match.url.includes("/profile")) {
    user_id = props.match.url.slice(6, 7);
  }

  useEffect(() => {
    currentUser();
  }, []);


  const tasks = mockData.map((task) => {
    return (
      <Achievs
        key={task.id}
        id={task.id}
        link={task.link}
        taskTitle={task.taskTitle}
        className={"progress-ring__circle profile-circle"}
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
