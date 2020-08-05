import React from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

import "../Main/main.scss";
import ProfileXPcircle from "../../helpers/ProfileXPcircle";

function Sidebar(props) {

  let path = false;

  if (props.location.includes("/user")) {
    path = true;
  }

  const theSidebar = () => {

    if (props.location === "/user/profile") {
      return (
        <section className="sidebar sidebar-xp">
          <div className="achievs">Achievements</div>
          <FadeIn>
            <ProfileXPcircle
              progress={75}
              taskCompletionAmount={`${75}/${100}`}
            />
          </FadeIn>
        </section>
      );
    } else {
      return (
        <section className="sidebar">
          <FadeIn>
            <Link to="/user/tasks" className="nav-link">Main Tasks</Link>
            <Link to="/user/side" className="nav-link">Side Tasks</Link>
            <Link to="/user/goals" className="nav-link">Goals</Link>
          </FadeIn>
        </section>
      );
    };
  };

  return (
    path && theSidebar()
  );
}

export default Sidebar;
