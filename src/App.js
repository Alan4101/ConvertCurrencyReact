import './App.css';
import React from 'react'

import {BrowserRouter, Switch, Route } from "react-router-dom";

import NavComponent from "./components/nav.components";
import Home from "./page/Home";
import Converter from "./page/Converter";

function App() {
  return (
      <BrowserRouter>
          <NavComponent/>
        <Switch>
            <Route path={'/'} exact component={ Home }/>
            <Route path={'/converter'}  component={ Converter }/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
