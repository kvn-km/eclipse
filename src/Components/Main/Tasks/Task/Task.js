import React from "react";
import logo from "../../../../logo.png";

import Sidebar from "../../../Nav/Sidebar";

function Task() {
  return (
    <section className="task main">
      <Sidebar />
      <p>TASK PAGE</p>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Camera or task input goes here</p>
    </section>
  );
}

export default Task;
