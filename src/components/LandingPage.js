import React, { Component } from "react";
import { connect } from "react-redux";

import Footer from "./Footer";

import "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <div className="text-center my-5">
        <div className="head">
          <div className="overlay"></div>
          <video
            autoPlay
            playsInline
            muted
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
                ></img>
                <h1 className="h3 font-weight-normal">Axie Scholar Tracker</h1>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps)(LandingPage);
