import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";


import { init } from "../../../../helpers/pose";

const mockData =
{
  id: 7,
  taskTitle: "watching",
  taskProgress: 25,
  link: "/user/task"
};

function refreshPage() {
  window.location.reload(false);
}

function Task(props) {
  let [user, setUser] = useState({
    info: null,
    levelInfo: null,
    tasks: null,
    task: null
  });
  console.log("TASK PROSP", props);

  let location = props.location.pathname;

  useEffect(() => {
    const currentUser = () => {
      Promise.all([
        axios.get('/api/user/current', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/levels'),
        axios.get('/api/tasks/user', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/tasks/task', { params: { id: location.slice(13) } })])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          let allUserTasks = all[2].data[location.slice(13) + 1];
          let theTask = all[3].data;
          setUser((prev) => ({
            ...prev,
            info: all[0].data,
            levelInfo: level.xp,
            tasks: allUserTasks,
            task: theTask
          }));
        })
        .catch(e => console.log("ERRORRRR", e));
    };
    currentUser();
    console.log(user);
  }, [props]);

  return (
    <FadeIn>
      <section className="task main">
        <div className="task-title">{`${mockData.taskTitle}`}</div>
        <button type="button" onClick={init}>Start</button>
        <div className="canvas-canvas" id><canvas id="canvas">Hello</canvas></div>
        <div id="label-container"></div>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
        <button type="button" onClick={refreshPage}>Refresh</button>
      </section >
    </FadeIn>
  );
}

export default Task;
