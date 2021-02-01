import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavComponent from "./components/nav/Nav";
import Home from "./components/pages/Home";
import Converter from "./components/pages/Converter";


function App() {
  return (
    <BrowserRouter>
      <NavComponent />
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/converter"} component={Converter} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
