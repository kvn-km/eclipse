import React, { useState } from "react";
// import axios from "axios";

// import Landing from "../Components/Header/Landing";
// import Login from "../Components/Pre/Login";
// import Signup from "../Components/Pre/Signup";
// import About from "../Components/Pre/About";


export default function useApplicationData() {
  const [state, setState] = useState("LANDING");


  const setDay = (day) => setState({ ...state, day });





  return {
    state,
    setDay
  };
}
