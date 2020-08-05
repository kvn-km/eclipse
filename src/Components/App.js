import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import "./App.scss";
<<<<<<< HEAD
import "./Main/main.scss";
=======
import axios from 'axios';
>>>>>>> login

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

<<<<<<< HEAD
  const [path, setPath] = useState("/");
=======
  const [state, setState] = useState("/");
  const [user, setUser] = useState(null);
>>>>>>> login

  function getUser() {
    axios.get('http://localhost:8001/api/users')
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      });
  }

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
<<<<<<< HEAD
    setPath(location.pathname);
=======
    setState(location.pathname);
    getUser();
>>>>>>> login
  }, [location]);


  const MainBody = () => (
    < Switch >
      {/* PRE-LOGIN */}
      <Route exact path="/" component={Landing} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      {/* LOGGED IN */}
      <Route exact path="/user" component={User} />
      <Route exact path="/user/profile" component={Profile} />
      <Route exact path="/user/tasks" component={TasksMain} />
      <Route exact path="/user/side" component={TasksSide} />
      <Route exact path="/user/task" component={Task} />
      <Route exact path="/user/goals" component={Goals} />
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
