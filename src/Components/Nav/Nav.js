import React from "react";
import { Link } from "react-router-dom";

import "./Nav.scss";

function Nav(props) {

  const navbarLinks = () => {
    let location = props.location;
    if (location.includes("/user")) {
      return (
        <ul class="navbar-nav text-right">
          <li class="nav-item active">
            <Link to="/user/profile" class="nav-link">LEVEL 87  VICTORLIANG</Link>
          </li>
        </ul>
      );
    } else if (!location.includes("/user")) {
      return (
        <ul class="navbar-nav text-right">
          <li class="nav-item active">
            <Link to="/about" class="nav-link">About</Link>
          </li>
          <li class="nav-item active">
            <Link to="/signup" class="nav-link">Sign Up</Link>
          </li>
          <li class="nav-item active">
            <Link to="/login" class="nav-link">Login</Link>
          </li>
        </ul>
      );
    }
  };


  return (
    <nav class="navbar navbar-expand-lg bg-black navbar-custom justify-content-end">
      <Link to="/" class="navbar-brand nav-link">ECLIPSE</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ml-auto mr-1 flex-grow-0" id="navbarSupportedContent">
        {navbarLinks()}
      </div>
    </nav>
  );
};

export default Nav;
