import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import axios from "axios";

import "../Main/main.scss";
import ProfileXPcircle from "../../helpers/ProfileXPcircle";

function Sidebar(props) {

  let [user, setUser] = useState({ info: null, levelInfo: null });

  // let path = false;

  // let user_id = "";
  // if (props.location.includes("/user")) {
  //   path = true;
  //   user_id = props.location.slice(6, 7);
  // }

  useEffect(() => {
    let mounted = true;
    const currentUser = () => {
      Promise.all([
        axios.get('/api/user/current', { params: { id: props.location.slice(6, 7) } }),
        axios.get('/api/levels')])
        .then((all) => {
          let level = all[1].data[all[0].data.level - 1];
          mounted && setUser((...prev) => ({
            info: all[0].data,
            levelInfo: level.xp
          }));
        });
    };
    if (props.location.includes("/user")) {
      currentUser();
    }
    return () => { mounted = false; };
  }, [props.location]);

  const theSidebar = () => {
    if (user.info && props.location === `/user/${user.info.id}/profile`) {
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
    } else if (user.info && props.location.includes("/user") && !props.location.includes("task/")) {
      return (
        <section className="sidebar">
          <FadeIn>
            <Link to={`/user/${user.info.id}/tasks`} className="nav-link">Main Tasks</Link>
            <Link to={`/user/${user.info.id}/side`} className="nav-link">Side Tasks</Link>
            <Link to={`/user/${user.info.id}/goals`} className="nav-link">Goals</Link>
          </FadeIn>
        </section>
      );
    };

  };




  return (
    theSidebar() || null
  );
}

export default Sidebar;
