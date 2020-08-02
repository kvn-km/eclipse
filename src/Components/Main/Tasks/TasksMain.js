import React from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../Nav/Sidebar";

function TasksMain() {
  return (
    <section className="tasks-main main">
      <Sidebar />
      <p>TASKS MAIN PAGE</p>
      <Link to="/user/task" class="nav-link">CLICK HERE TO GOTO A TASK (dev mode)</Link>
    </section>
  );
}

export default TasksMain;
