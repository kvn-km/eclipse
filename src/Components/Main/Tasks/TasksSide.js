import React from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../Nav/Sidebar";

function TasksSide() {
  return (
    <section className="tasks-side main">
      <Sidebar />
      <p>TASKS SIDE PAGE</p>
      <Link to="/user/task" class="nav-link">CLICK HERE TO GOTO A TASK (dev mode)</Link>
    </section>
  );
}

export default TasksSide;
