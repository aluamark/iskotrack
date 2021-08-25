import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut, showLoader } from "../actions";

import LoginForm from "./LoginForm";
import history from "../history";

class Navbar extends Component {
  renderNavbar() {
    if (this.props.isSignedIn) {
      if (this.props.loading) {
        return (
          <li className="nav-item mt-4">
            <button className="btn btn-danger btn-sm" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Sign Out
            </button>
          </li>
        );
      }
      return (
        <ul className="nav justify-content-center mt-4">
          <li className="nav-item">
            <button
              className="col-sm btn btn-warning btn-sm me-1 float-start"
              onClick={() => {
                history.push("/scholars");
              }}
            >
              Scholars 🎓
            </button>
          </li>
          <li className="nav-item">
            <button
              className="col-sm btn btn-warning btn-sm me-1"
              onClick={() => {
                history.push("/leaderboard");
              }}
            >
              Leaderboard 🔥
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => {
                this.props.signOut();
                this.props.showLoader();
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <nav className="nav nav-masthead justify-content-center float-md-end">
          <LoginForm />
        </nav>
      );
    }
  }

  renderAxieLogo() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 720) {
      return (
        <div className="text-center">
          <Link
            className="float-md-start p-2 mx-3"
            to={this.props.isSignedIn ? "/scholars" : "/"}
          >
            <img
              src="https://cdn.axieinfinity.com/landing-page/_next/static/images/logo-f3b5c962671a2516bc9fef42ad9e9145@1x.webp"
              alt="axie"
              height="50px"
            />
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="mb-auto flex-column mt-3">
        {this.renderAxieLogo()}
        <ul className="nav justify-content-center">{this.renderNavbar()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { signOut, showLoader })(Navbar);
