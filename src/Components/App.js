import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import "./App.scss";

import Nav from "./Nav/Nav";
import Landing from "./Pre/Landing";
import Login from "./Pre/Login";
import Signup from "./Pre/Signup";
import About from "./Pre/About";
import User from "./Main/User";
import TasksMain from "./Main/Tasks/TasksMain";
import TasksSide from "./Main/Tasks/TasksSide";
import Goals from "./Main/GoalsAchievs/Goals";


function App() {

  const usePageViews = () => {
    let location = useLocation();
    useEffect(() => {
      console.log(location.pathname);
    }, [location]);
  };

  let location = usePageViews();

  const MainBody = () => (
    < Switch >
      {/* PRE-LOGIN */}
      < Route exact path="/" component={Landing} ></Route>
      <Route exact path="/about" component={About}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      {/* LOGGED IN */}
      <Route exact path="/user" component={User}></Route>
      <Route exact path="/user/tasks" component={TasksMain}></Route>
      <Route exact path="/user/side" component={TasksSide}></Route>
      <Route exact path="/user/goals" component={Goals}></Route>
    </Switch >
  );

  return (
    <div className="App">
      <Nav location={location} />
      <MainBody />
    </div >
  );
}

export default App;
