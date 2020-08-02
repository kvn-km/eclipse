import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Nav from "./Nav/Nav";
import Landing from "./Pre/Landing";
import Login from "./Pre/Login";
import Signup from "./Pre/Signup";
import About from "./Pre/About";


function App() {

  const MainBody = () => (
    <Switch>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/about' component={About}></Route>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/signup' component={Signup}></Route>
    </Switch>
  );

  return (
    <div className="App">
      <Nav />
      <MainBody />
    </div >
  );
}

export default App;
