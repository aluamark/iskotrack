import React, { Component } from "react";

class EmptyPage extends Component {
  render() {
    return (
      <div className="container text-white mt-5 pt-5">
        <div className="container">
          <div className="alert alert-danger" role="alert">
            Page not found!
          </div>
        </div>
      </div>
    );
  }
}

export default EmptyPage;
