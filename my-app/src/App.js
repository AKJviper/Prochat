import React, { Component, useState, useEffect  } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Start from "./myComponents/Start/Start";
import Chatbox from "./myComponents/Chatbox/Chatbox";
class App extends Component {
  render() {
    return (
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
          <Route path="/chatbox" element={<Chatbox />}></Route>
          
        
      </Routes>
    </BrowserRouter>
    );
  }
}

// let el = <h1>Hello AKJ</h1>;
// let el = React.createElement("h1", null, "Hello AKJviper");

export default App;
