import React from "react";
import FadeIn from "react-fade-in";

import Sidebar from "../../../Nav/Sidebar";

import { init } from "../../../../helpers/pose";

function Task() {

  return (
    <section className="task main">
      <Sidebar />
      <FadeIn>
        <button type="button" onClick={init}>Start</button>
        <div className="canvas-canvas"><canvas id="canvas"></canvas></div>
        <div id="label-container"></div>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
      </FadeIn>
    </section >
  );
}

export default Task;
