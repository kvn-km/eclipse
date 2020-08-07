import React, { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";

import TaskButton from "../TaskButtons/TaskButton";
import "../main.scss";


function TasksSide(props) {
  let [user, setUser] = useState({ info: null, levelInfo: null });

  let location = props.location.pathname;

  const currentUser = () => {
    Promise.all([axios.get('/api/user/current', { params: { id: location.slice(6, 7) } }), axios.get('/api/levels')])
      .then((all) => {
        let level = all[1].data[all[0].data.level - 1];
        setUser((...prev) => ({ ...prev, info: all[0].data, levelInfo: level.xp }));
      });
  };

  useEffect(() => {
    currentUser();
  }, []);

  const mockData = [
    {
      id: 1,
      taskTitle: "Task Title 1",
      taskProgress: 75,
      link: "/user/2/task"
    },
    {
      id: 2,
      taskTitle: "Task Title 2",
      taskProgress: 56,
      link: "/user/2/task"
    },
    {
      id: 3,
      taskTitle: "Task Title 3",
      taskProgress: 33,
      link: "/user/2/task"
    },
    {
      id: 4,
      taskTitle: "Task Title 4",
      taskProgress: 12,
      link: "/user/2/task"
    },
    {
      id: 5,
      taskTitle: "Task Title 5",
      taskProgress: 40,
      link: "/user/2/task"
    },
    {
      id: 6,
      taskTitle: "Task Title 6",
      taskProgress: 60,
      link: "/user/2/task"
    },
    {
      id: 7,
      taskTitle: "Task Title 7",
      taskProgress: 25,
      link: "/user/2/task"
    },
    {
      id: 8,
      taskTitle: "Task Title 8",
      taskProgress: 90,
      link: "/user/2/task"
    }
  ];

  const tasks = mockData.map((task) => {
    return (
      <TaskButton
        key={task.id}
        id={task.id}
        link={task.link}
        taskTitle={task.taskTitle}
        progress={task.taskProgress}
        taskCompletionAmount={`${task.taskProgress}%`}
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

export default TasksSide;
