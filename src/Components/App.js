import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import useApplicationData from "../hooks/useApplicationData";

import "./App.css";

function App() {

  // const [state, setState] = useState();

  const Nav = () => (
    <nav class="navbar navbar-expand-lg navbar-white bg-black">
      <a class="navbar-brand" href="#">ECLIPSE</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">About<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Sign Up</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Login</a>
          </li>
        </ul>

      </div>
    </nav>
  );

  const Home = () => (
    <div className='home'>
      <h1>HOME</h1>
      <p>Main Page</p>
    </div>
  );

  const About = () => (
    <div className='about'>
      <h1>ABOUT</h1>
      <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
      <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
    </div>
  );

  const Contact = () => (
    <div className='contact'>
      <h1>Contact</h1>
      <p>BLAHBLAH</p>
    </div>
  );

  const MainBody = () => (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/about' component={About}></Route>
      <Route exact path='/contact' component={Contact}></Route>
    </Switch>
  );

  return (
    <div className="App">
      <Nav />
      <MainBody />

      {/* <section className="Main">
      </section> */}
    </div >
  );
}

export default App;
