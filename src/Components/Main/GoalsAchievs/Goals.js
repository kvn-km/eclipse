import React from "react";
import FadeIn from "react-fade-in";

import TaskButton from "../TaskButtons/TaskButton";
import "../main.scss";

const mockData = [
  {
    id: 1,
    taskTitle: "Task Title 1",
    taskProgress: 75,
    link: "/user/task"
  },
  {
    id: 2,
    taskTitle: "Task Title 2",
    taskProgress: 56,
    link: "/user/task"
  },
  {
    id: 3,
    taskTitle: "Task Title 3",
    taskProgress: 33,
    link: "/user/task"
  },
  {
    id: 4,
    taskTitle: "Task Title 4",
    taskProgress: 12,
    link: "/user/task"
  },
  {
    id: 5,
    taskTitle: "Task Title 5",
    taskProgress: 40,
    link: "/user/task"
  },
  {
    id: 6,
    taskTitle: "Task Title 6",
    taskProgress: 60,
    link: "/user/task"
  },
  {
    id: 7,
    taskTitle: "Task Title 7",
    taskProgress: 25,
    link: "/user/task"
  },
  {
    id: 8,
    taskTitle: "Task Title 8",
    taskProgress: 90,
    link: "/user/task"
  }
];

function Goals() {

  const tasks = mockData.map((task) => {
    return (
      <TaskButton
        key={task.id}
        id={task.id}
        link={task.link}
        taskTitle={task.taskTitle}
        progress={task.taskProgress}
        taskCompletionAmount={`${task.taskProgress}%`}
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

export default Goals;
