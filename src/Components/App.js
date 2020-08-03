import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import "./App.scss";

import Nav from "./Nav/Nav";
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

  const [state, setState] = useState("/");


  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    setState(location.pathname);
  }, [location]);


  const MainBody = () => (
    < Switch >
      {/* PRE-LOGIN */}
      < Route exact path="/" component={Landing} ></Route>
      <Route exact path="/about" component={About}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      {/* LOGGED IN */}
      <Route exact path="/user" component={User}></Route>
      <Route exact path="/user/profile" component={Profile}></Route>
      <Route exact path="/user/tasks" component={TasksMain}></Route>
      <Route exact path="/user/side" component={TasksSide}></Route>
      <Route exact path="/user/task" component={Task}></Route>
      <Route exact path="/user/goals" component={Goals}></Route>
    </Switch >
  );

  return (
    <div className="App">
      <Nav location={state} />
      <MainBody />
    </div >
  );
}

export default App;