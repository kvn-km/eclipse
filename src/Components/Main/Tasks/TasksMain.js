import React from "react";
import FadeIn from "react-fade-in";

import TaskButton from "../TaskButtons/TaskButton";
import Sidebar from "../../Nav/Sidebar";

function TasksMain() {
  return (
    <section className="tasks-main main">
      <Sidebar />
      <FadeIn>

        {/* MAP FUNCTION TO LOOP FOR BELOW */}

        <div className="task-container">
          <TaskButton link="/user/task" taskTitle={"Task Title 1"} progress={75} taskCompletionAmount={`${75}%`} />
          <TaskButton link="/user/task" taskTitle={"Task Title 2"} progress={56} taskCompletionAmount={`${56}%`} />
          <TaskButton link="/user/task" taskTitle={"Task Title 3"} progress={33} taskCompletionAmount={`${33}%`} />
          <TaskButton link="/user/task" taskTitle={"Task Title 4"} progress={12} taskCompletionAmount={`${12}%`} />
        </div>
        <div className="task-container">
          <TaskButton link="/user/task" taskTitle={"Task Title 5"} progress={40} taskCompletionAmount={`${40}%`} />
          <TaskButton link="/user/task" taskTitle={"Task Title 6"} progress={60} taskCompletionAmount={`${60}%`} />
          <TaskButton link="/user/task" taskTitle={"Task Title 7"} progress={25} taskCompletionAmount={`${25}%`} />
          <TaskButton link="/user/task" taskTitle={"Task Title 8"} progress={90} taskCompletionAmount={`${90}%`} />
        </div>

      </FadeIn>
    </section>
  );
}

export default TasksMain;
