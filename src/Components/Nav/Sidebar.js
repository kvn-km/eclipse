import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import axios from "axios";

import "../Main/main.scss";
import ProfileXPcircle from "../../helpers/ProfileXPcircle";

function Sidebar(props) {

  let [user, setUser] = useState({ info: null, levelInfo: null });
  let location = props.location;

  let path = false;

  let user_id = "";
  if (location.includes("/user")) {
    path = true;
    user_id = location.slice(6, 7);
  }

  useEffect(() => {
    const currentUser = () => {
      Promise.all([
        axios.get('/api/user/current', { params: { id: location.slice(6, 7) } }),
        axios.get('/api/levels')])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          setUser((...prev) => ({
            info: all[0].data,
            levelInfo: level.xp
          }));
        });
    };
    if (location !== "/signup" || location !== "/login" || !location !== "/signup") {
      currentUser();
    }
  }, [location]);



  const theSidebar = () => {
    if (user.info && location === `/user/${user_id}/profile`) {
      return (
        <section className="sidebar sidebar-xp">
          <div className="achievs">Achievements</div>
          <FadeIn>
            <ProfileXPcircle
              progress={(user.info.xp / user.levelInfo) * 100}
              taskCompletionAmount={`${user.info.xp}/${user.levelInfo}`}
            />
          </FadeIn>
        </section>
      );
    } else {
      return (
        <section className="sidebar">
          <FadeIn>
            <Link to={`/user/${user_id}/tasks`} className="nav-link">Main Tasks</Link>
            <Link to={`/user/${user_id}/side`} className="nav-link">Side Tasks</Link>
            <Link to={`/user/${user_id}/goals`} className="nav-link">Goals</Link>
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
