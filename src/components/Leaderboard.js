import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  renderAllScholarCounter() {
    let totalScholars = 0;

    this.props.allScholars.forEach((scholar) => {
      totalScholars++;
    });

    return <div>Fetching {totalScholars} trainers steady ka lang jan..</div>;
  }

  renderLeaderboard() {
    let totalScholars = 0;

    this.props.allScholars.forEach(() => {
      totalScholars++;
    });

    let myData = Object.keys(this.props.leaderboard).map((key) => {
      return this.props.leaderboard[key];
    });

    let counter = 0;

    myData.sort(function (a, b) {
      return b.elo - a.elo;
    });

    const rows = myData.map((scholar) => {
      counter++;

      return (
        <tr key={counter}>
          <th>{counter}</th>
          <td>{scholar.nickname}</td>
          <td>{scholar.elo}</td>
        </tr>
      );
    });

    if (counter !== totalScholars) {
      return (
        <div className="text-center mt-1">
          <div>Loading leaderboard data...</div>
          {this.renderAllScholarCounter()}
          <div
            className="spinner-border spinner-border m-3"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      );
    } else {
      return (
        <div className="card bg-dark mb-3">
          <table className="table text-white">
            <thead>
              <tr>
                <th className="table-secondary">Rank</th>
                <th className="table-secondary">Name</th>
                <th className="table-secondary">MMR</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      );
    }
  }

  render() {
    if (!this.props.leaderboard) {
      return (
        <div className="text-center mt-1">
          Loading arena data...
          <div
            className="spinner-border spinner-border-sm mx-3"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <h4 className="text-warning text-center my-3">
              Leaderboard 🔥
              <br></br>
              <small className="text-danger">
                CRJ x Smash x Bambee x NoSleep
              </small>
            </h4>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm col-md-6">{this.renderLeaderboard()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leaderboard: state.scholarArena,
    allScholars: Object.values(state.allScholars),
  };
};

export default connect(mapStateToProps)(Leaderboard);
