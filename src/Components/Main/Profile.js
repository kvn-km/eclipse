import React from "react";
// import { Link } from "react-router-dom";

import "./main.scss";

import Sidebar from "../Nav/Sidebar";

function Profile() {

  return (
    <section className="profile main">
      <div class="main">
        <Sidebar />
        <p>PROFILE PAGE</p>
      </div>
    </section>
  );
}

export default Profile;
