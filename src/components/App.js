import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";

import LandingPage from "./LandingPage";
import ScholarList from "./scholars/ScholarList";
import EmptyPage from "./EmptyPage";

import Navbar from "./Navbar";

import "./App.css";
import history from "../history";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/scholars" component={ScholarList} />
          <Route component={EmptyPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
