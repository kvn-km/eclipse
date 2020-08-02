import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (

    <nav class="navbar navbar-expand-lg bg-black navbar-custom">
      <Link to="/" class="navbar-brand">ECLIPSE</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link to="/about" class="nav-link">About</Link>
          </li>
          <li class="nav-item">
            <Link to="/signup" class="nav-link">Sign Up</Link>
          </li>
          <li class="nav-item">
            <Link to="/login" class="nav-link">Login</Link>
          </li>
        </ul>

      </div>
    </nav>

  );
}

export default Nav;
