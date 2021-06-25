import React, { Component } from "react";

class ScholarEmpty extends Component {
  render() {
    return (
      <div className="container text-white mt-5 pt-5">
        <div className="container">
          <div className="alert alert-danger" role="alert">
            Please sign in.
          </div>
        </div>
      </div>
    );
  }
}

export default ScholarEmpty;
