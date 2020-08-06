import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import axios from "axios";

import "./Nav.scss";

function Nav(props) {
  let [user, setUser] = useState({ info: null, levelInfo: null });

  const currentUser = () => {
    Promise.all([axios.get('/api/user/current', { params: { id: props.location.slice(6, 7) } }), axios.get('/api/levels')])
      .then((all) => {
        let level = all[1].data[all[0].data.level - 1];
        setUser((prev) => ({ ...prev, info: all[0].data, levelInfo: level.xp }));
      });
  };

  let user_id = "";
  if (props.location.includes("/user")) {
    user_id = props.location.slice(6, 7);
  }

  useEffect(() => {
    currentUser();
  }, [props.location]);


  const navbarLinks = () => {
    console.log(user.info);
    let location = props.location;
    if (location.includes(`/user/${user_id}`)) {
      return (
        <ul className="navbar-nav text-right">
          <li className="nav-item active">
            <Link to={`/user/${user_id}/profile`} className="nav-link">{`LEVEL ${user.info.level}  ${user.info.username}`}</Link>
          </li>
        </ul>
      );
    } else if (!location.includes("/user")) {
      return (
        <ul className="navbar-nav text-right">
          <li className="nav-item active">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item active">
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </li>
          <li className="nav-item active">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </ul>
      );
    } else if (location === `/user/${user_id}/profile`) {
      return (
        <ul className="navbar-nav text-right">
          <li className="nav-item active">
            <Link to="/" className="nav-link">{`Log out`}</Link>
          </li>
        </ul>
      );
    }
  };


  return (
    <nav className="navbar navbar-expand-lg bg-black navbar-custom justify-content-end">
      {props.location === "/about" ? <Link to="/" className="navbar-brand nav-link">&lt; back</Link> : <Link to="/" className="navbar-brand nav-link">ECLIPSE</Link>}
      {props.location.includes("/tasks") && <Link to={`/user/${user_id}`} className="navbar-brand nav-link">&lt; back</Link>}
      {props.location.includes("/side") && <Link to={`/user/${user_id}`} className="navbar-brand nav-link">&lt; back</Link>}
      {props.location.includes("/goal") && <Link to={`/user/${user_id}`} className="navbar-brand nav-link">&lt; back</Link>}
      {props.location.includes("/profile") && <Link to={`/user/${user_id}`} className="navbar-brand nav-link">&lt; back</Link>}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ml-auto mr-1 flex-grow-0" id="navbarSupportedContent">
        <FadeIn>
          {user.info && navbarLinks()}
          {props.location === "/" && navbarLinks()}
          {props.location === "/about" && navbarLinks()}
          {props.location === "/signup" && navbarLinks()}
          {props.location === "/login" && navbarLinks()}
        </FadeIn>
      </div>
    </nav>
  );
};

export default Nav;
