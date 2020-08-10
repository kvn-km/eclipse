import React, { useEffect, useState, useRef } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";

import "../../TaskButtons/taskButton.scss";

function ResetTask(props) {
  let [user, setUser] = useState({ info: null, levelInfo: null });

  function redirectPage(props) {
    debugger;
    Promise.resolve(
      axios.put('/api/tasks/task/reset', {
        params: {
          user_id: props.match.params.user_id,
          task_id: props.match.params.task_id
        }
      })
        .then((res) => {
          console.log("RESETTED");
          props.history.goBack();
        })
        .catch(e => console.log("RESET ERRORRRR", e)));
  }

  let location = props.location.pathname;
  let circleRef = useRef();

  useEffect(() => {
    let mounted = true;

    let theCircle = (el) => {
      let circle = el;
      let radius = circle.r.baseVal.value;
      let circumference = radius * 2 * Math.PI;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
      function setTheProgress() {
        const offset = circumference - 100 / 100 * circumference;
        circle.style.strokeDashoffset = offset;
      };
      if (props.resetValue) {
        setTimeout(() => {
          setTheProgress();
        }, 500);
      }
    };

    const resetCurrentTask = () => {

      Promise.all([
        axios.get('/api/user/current', { params: { id: props.match.params.user_id } }),
        axios.get('/api/tasks/user', { params: { id: props.match.params.user_id } }),
        axios.get('/api/tasks/task', { params: { id: props.match.params.task_id } })])
        .then((all) => {
          let userTask = all[1].data[props.match.params.user_id];
          let theCurrentTask = all[2].data[0];
          let newState = {
            info: all[0].data,
            userTaskInfo: userTask,
            currentTask: theCurrentTask
          };
          mounted && setUser(prev => newState);
        })
        .catch(e => console.log("ERRORRRR", e));

      setTimeout(() => {
        mounted && redirectPage(props);
      }, 2000);
    };

    theCircle(circleRef.current);
    resetCurrentTask();

    return () => { mounted = false; };
  }, [location]);




  return (
    <section className="user-reset">
      <div className="main">
        <FadeIn>
          <svg
            className="progress-ring-reset"
            width="600"
            height="600">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#65c0e0" />
                <stop offset="25%" stopColor="#e9a5a5" />
                <stop offset="40%" stopColor="#b8c135" />
                <stop offset="50%" stopColor="#81c1d9" />
                <stop offset="100%" stopColor="#aea2db" />
              </linearGradient>
            </defs>
            <circle
              ref={circleRef}
              className="progress-ring__circle-reset"
              stroke="white"
              strokeWidth="20"
              fill="transparent"
              r="260"
              cx="300"
              cy="300" />
          </svg>
          <div className="task-completion-amount-profile-reset">
            Resetting task
          </div>
        </FadeIn>
      </div>
      <div className="task-title-reset">
        {user.currentTask && user.currentTask.name}
      </div>
    </section>
  );
};

export default ResetTask;
