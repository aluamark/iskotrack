import React, { Component } from "react";
import { connect } from "react-redux";
import { bypass } from "../actions";

import Footer from "./Footer";

import "./LandingPage.css";

class LandingPage extends Component {
  renderLandingPage() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 720) {
      return (
        <div className="head">
          <div className="overlay"></div>
          <h1 className="h3 font-weight-normal">Axie Scholar Tracker</h1>
          <img src="/axiehome.gif" alt="digital-nation" />
        </div>
      );
    }

    return (
      <div className="head">
        <div className="overlay"></div>
        <video
          autoPlay
          playsInline
          muted
          loop
          src="https://cdn.axieinfinity.com/website/final.mp4"
        />
        <div className="container h-100">
          <div className="d-flex h-100 align-items-center">
            <div className="w-100 text-white">
              <h1 className="h3 font-weight-normal">Axie Scholar Tracker</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="text-center my-5">
        {this.renderLandingPage()}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { bypass })(LandingPage);
