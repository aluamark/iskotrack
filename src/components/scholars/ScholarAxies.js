import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAxies } from "../../actions";

class ScholarAxies extends Component {
  renderAxies = () => {
    if (this.props.axie0 === undefined) {
      return (
        <div>
          <img
            className="mb-1"
            src="https://storage.googleapis.com/assets.axieinfinity.com/axies/479876/axie/axie-full-transparent.png"
            alt="slp"
            height="30px"
            width="40px"
          />
          <img
            className="mb-1"
            src="https://storage.googleapis.com/assets.axieinfinity.com/axies/418283/axie/axie-full-transparent.png"
            alt="slp"
            height="30px"
            width="40px"
          />
          <img
            className="mb-1"
            src="https://storage.googleapis.com/assets.axieinfinity.com/axies/458219/axie/axie-full-transparent.png"
            alt="slp"
            height="30px"
            width="40px"
          />
        </div>
      );
    }
    return (
      <div>
        <img
          className="mb-1"
          src={this.props.axie0}
          alt="slp"
          height="30px"
          width="40px"
        />
        <img
          className="mb-1"
          src={this.props.axie1}
          alt="slp"
          height="30px"
          width="40px"
        />
        <img
          className="mb-1"
          src={this.props.axie2}
          alt="slp"
          height="30px"
          width="40px"
        />
      </div>
    );
  };

  render() {
    return <div>{this.renderAxies()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    axie0: state.scholarsAxies[ownProps.ethAddress].axie0,
    axie1: state.scholarsAxies[ownProps.ethAddress].axie1,
    axie2: state.scholarsAxies[ownProps.ethAddress].axie2,
  };
};

export default connect(mapStateToProps, { fetchAxies })(ScholarAxies);
