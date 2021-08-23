import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  componentDidMount() {
    if (!this.props.leaderboard) {
      console.log(this.props.leaderboard);
    }
  }

  renderLeaderboard() {
    let myData = Object.keys(this.props.leaderboard).map((key) => {
      return this.props.leaderboard[key];
    });

    let counter = 0;

    console.log(myData);

    myData.sort(function (a, b) {
      return b.elo - a.elo;
    });

    console.log(myData);

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
            <h4 className="text-warning my-3">Leaderboard</h4>
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
  return { leaderboard: state.scholarArena };
};

export default connect(mapStateToProps)(Leaderboard);
