import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login pre">
      <h1>LOGIN PAGE</h1>
      <Link to="/user" class="nav-link">CLICK HERE TO LOGIN (dev mode)</Link>
    </section>
  );
}

export default Login;
