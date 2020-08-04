import React from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

import "../Main/main.scss";

function Sidebar() {
  return (
    <section className="sidebar">
      <FadeIn>
        <Link to="/user/tasks" className="nav-link">Main Tasks</Link>
        <Link to="/user/side" className="nav-link">Side Tasks</Link>
        <Link to="/user/goals" className="nav-link">Goals</Link>
      </FadeIn>
    </section>
  );
}

export default Sidebar;
