import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";


import { preINIT } from "../../../../helpers/pose";

function redirectPage(props) {
  props.history.goBack();
}

function refreshPage(props) {
  props.history.go();
}

function Task(props) {
  let [user, setUser] = useState({
    info: null,
    levelInfo: null,
    usersTaskInfo: null,
    task: null
  });

  let location = props.location.pathname;

  useEffect(() => {
    let mounted = true;
    const currentUser = () => {
      Promise.all([
        axios.get('/api/user/current', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/levels'),
        axios.get('/api/tasks/user', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/tasks/task', { params: { id: location.slice(13) } })])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          let taskInfo = all[2].data[location.slice(13) - 1];
          let theTask = all[3].data[0];
          let newState = {
            info: all[0].data,
            levelInfo: level.xp,
            usersTaskInfo: taskInfo,
            task: theTask
          };
          mounted && setUser(prev => newState);
        }).then(() => {
        })
        .catch(e => console.log("ERRORRRR", e));
    };
    currentUser();
    return () => { mounted = false; };
  }, [location]);


  useEffect(() => {

    user.info && preINIT(user, refreshPage, props, redirectPage);

  }, [user, props]);


  return (
    <FadeIn>
      <section className="task main">
        <div className="task-title">{user.task && user.task.name}</div>

        <div className="canvas-canvas" ><canvas id="canvas"></canvas></div>
        <div id="label-container"></div>

        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
      </section >
    </FadeIn>
  );
}

export default Task;
