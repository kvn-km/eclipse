import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import "./App.scss";
import "./Main/main.scss";
// import axios from 'axios';

import Nav from "./Nav/Nav";
import Sidebar from "./Nav/Sidebar";
import Landing from "./Pre/Landing";
import Login from "./Pre/Login";
import Signup from "./Pre/Signup";
import About from "./Pre/About";
import User from "./Main/User";
import Profile from "./Main/Profile";
import TasksMain from "./Main/Tasks/TasksMain";
import TasksSide from "./Main/Tasks/TasksSide";
import Task from "./Main/Tasks/Task/Task";
import Goals from "./Main/GoalsAchievs/Goals";

function App() {
  let [path, setPath] = useState("/");

  let location = useLocation();

  useEffect(() => {
    setPath((prev) => location.pathname);
  }, [location]);

  const MainBody = () => (
    < Switch >
      {/* PRE-LOGIN */}
      <Route exact path="/" component={Landing} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      {/* LOGGED IN */}
      <Route exact path="/user/:user_id" component={User} />
      <Route exact path="/user/:user_id/profile" component={Profile} />
      <Route exact path="/user/:user_id/tasks" component={TasksMain} />
      <Route exact path="/user/:user_id/side" component={TasksSide} />
      <Route exact path="/user/:user_id/task" component={Task} />
      <Route exact path="/user/:user_id/goals" component={Goals} />
    </Switch >
  );



  return (

    <div className="App">
      <Nav location={path} />
      <div className="main-container">
        <Sidebar location={path} />
        <MainBody />
      </div>
    </div >

  );
}

export default App;
