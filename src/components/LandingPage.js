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
        <div className="container">
          <div className="overlay"></div>
          <h1 className="h3 font-weight-normal">Axie Scholar Tracker</h1>
          <img
            src="https://cdn.axieinfinity.com/landing-page/_next/static/images/banner-941f68fe82413ac57390b1d4b6ca51ef.png"
            class="img-fluid"
            alt="digital-nation"
          />
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
              <img
                className="mb-4"
                src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
                alt="slp"
                height="75px"
                width="75px"
              />
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
