import React from "react";
import FadeIn from "react-fade-in";

import { init } from "../../../../helpers/pose";

const mockData =
{
  id: 7,
  taskTitle: "Task Title 7",
  taskProgress: 25,
  link: "/user/task"
};

function Task(props) {

  return (
    <FadeIn>
      <section className="task main">
        <div className="task-title">{`${mockData.taskTitle}`}</div>
        <button type="button" onClick={init}>Start</button>
        <div className="canvas-canvas"><canvas id="canvas"></canvas></div>
        <div id="label-container"></div>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
      </section >
    </FadeIn>
  );
}

export default Task;
