import React from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

import "./Nav.scss";

function Nav(props) {

  const navbarLinks = () => {
    let location = props.location;
    if (location.includes("/user")) {
      return (
        <ul className="navbar-nav text-right">
          <li className="nav-item active">
            <Link to="/user/profile" className="nav-link">LEVEL 87  VICTORLIANG</Link>
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
    }
  };


  return (
    <nav className="navbar navbar-expand-lg bg-black navbar-custom justify-content-end">
      {props.location === "/about" ? <Link to="/" className="navbar-brand nav-link">&lt; back</Link> : <Link to="/" className="navbar-brand nav-link">ECLIPSE</Link>}
      {props.location.includes("/tasks") && <Link to="/user" className="navbar-brand nav-link">&lt; back</Link>}
      {props.location.includes("/side") && <Link to="/user" className="navbar-brand nav-link">&lt; back</Link>}
      {props.location.includes("/goal") && <Link to="/user" className="navbar-brand nav-link">&lt; back</Link>}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ml-auto mr-1 flex-grow-0" id="navbarSupportedContent">
        <FadeIn>
          {navbarLinks()}
        </FadeIn>
      </div>
    </nav>
  );
};

export default Nav;
