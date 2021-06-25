import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions";

import LoginForm from "./LoginForm";

class Navbar extends Component {
  renderNavbar() {
    if (this.props.isSignedIn) {
      return (
        <nav className="nav nav-masthead justify-content-center float-md-end pt-3 ">
          <div className="nav-item pe-3">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.props.signOut()}
            >
              Sign Out
            </button>
          </div>
        </nav>
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
          {this.renderNavbar()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps, { signOut })(Navbar);
