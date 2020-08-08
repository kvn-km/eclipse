import React from "react";
import FadeIn from "react-fade-in";

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

  return (
    <FadeIn>
      <section className="task main">
        <div className="task-title">{`${mockData.taskTitle}`}</div>
        <button type="button" onClick={init}>Start</button>
        <div className="canvas-canvas" id><canvas id="canvas"></canvas></div>
        <div id="label-container"></div>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
        <button type="button" onClick={refreshPage}>Refresh</button>
      </section >
    </FadeIn>
  );
}

export default Task;
