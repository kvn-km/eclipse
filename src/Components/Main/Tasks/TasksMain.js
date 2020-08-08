import React, { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";


import TaskButton from "../TaskButtons/TaskButton";
import "../main.scss";


function TasksMain(props) {
  let [user, setUser] = useState({
    info: null,
    levelInfo: null,
    tasks: null,
    allTasks: []
  });

  let location = props.location.pathname;

  useEffect(() => {
    let mounted = true;
    const currentUser = () => {
      Promise.all([
        axios.get('/api/user/current', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/levels'),
        axios.get('/api/tasks/user', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/tasks/main')])
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

  const tasks = user.allTasks.map((task, i) => {
    const userTask = user.tasks[i];
    return (
      <TaskButton
        key={task.id}
        id={task.id}
        link={"/user/2/task"}
        taskTitle={task.name}
        progress={userTask.progress}
        taskCompletionAmount={`${userTask.progress}%`}
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

export default TasksMain;
