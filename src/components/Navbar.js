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
          <nav className="nav nav-masthead justify-content-center float-md-end pt-3 ">
            <div className="nav-item px-3">
              <button className="btn btn-danger btn-sm" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Sign Out
              </button>
            </div>
          </nav>
        );
      }
      return (
        <div>
          <div className="row">
            <div className="col-8">
              <button
                className="btn btn-warning btn-sm mt-3 me-1 float-start"
                onClick={() => {
                  history.push("/scholars");
                }}
              >
                Scholars 🎓
              </button>
              <button
                className="btn btn-warning btn-sm mt-3"
                onClick={() => {
                  history.push("/leaderboard");
                }}
              >
                Leaderboard 🔥
              </button>
            </div>
            <div className="col-4">
              <button
                className="btn btn-danger btn-sm mt-3 float-end"
                onClick={() => {
                  this.props.signOut();
                  this.props.showLoader();
                }}
              >
                <i className="fas fa-sign-out-alt"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <nav className="nav nav-masthead justify-content-center float-md-end">
          <LoginForm />
        </nav>
      );
    }
  }

  render() {
    return (
      <div className="mb-auto flex-column mt-3">
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
        <div className="container">{this.renderNavbar()}</div>
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
