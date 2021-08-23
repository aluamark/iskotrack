import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bypass } from "../actions";

import LandingPage from "./LandingPage";
import ScholarList from "./scholars/ScholarList";
import Leaderboard from "./Leaderboard";
import EmptyPage from "./EmptyPage";

import Navbar from "./Navbar";

import "./App.css";
import history from "../history";

class App extends Component {
  render() {
    const userId = localStorage.getItem("UserId");
    const token = localStorage.getItem("Token");
    const session = { userId, token };
    if (userId && token) {
      this.props.bypass(session);
    }

    return (
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/scholars" component={ScholarList} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route component={EmptyPage} />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, { bypass })(App);
