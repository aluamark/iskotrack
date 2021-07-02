import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchScholar, deleteScholar, deleteScholarData } from "../../actions";

import { CopyToClipboard } from "react-copy-to-clipboard";

class ScholarCard extends Component {
  componentDidMount() {
    this.props.fetchScholar(this.props.ethAddress);
  }

  getManagerTotalSlp(totalSlp) {
    const scholarSlp = (this.props.sharePercentage / 100) * totalSlp;
    const managerSlp = Math.floor(totalSlp - scholarSlp);

    const formatted = new Intl.NumberFormat().format(managerSlp);

    return (
      <div className="col-sm">
        Manager{" "}
        <img
          className="mb-1"
          src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
          alt="slp"
          height="15px"
          width="15px"
        />
        : {formatted}
      </div>
    );
  }

  getManagerTotalPhp(totalSlp) {
    const scholarSlp = (this.props.sharePercentage / 100) * totalSlp;
    const managerPhp = Math.floor(
      (totalSlp - scholarSlp) * this.props.slpPrice
    );

    const formatted = new Intl.NumberFormat().format(managerPhp);

    return (
      <div className="col-sm">
        Manager PHP: <b className="text-success">₱{formatted}</b>
      </div>
    );
  }

  getScholarTotalSlp(totalSlp) {
    const scholarSlp = Math.floor(
      (this.props.sharePercentage / 100) * totalSlp
    );

    const formatted = new Intl.NumberFormat().format(scholarSlp);

    return (
      <div className="col-sm">
        Scholar{" "}
        <img
          className="mb-1"
          src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
          alt="slp"
          height="15px"
          width="15px"
        />
        : {formatted}
      </div>
    );
  }

  getScholarTotalPhp(totalSlp) {
    const scholarSlp = Math.floor(
      (this.props.sharePercentage / 100) * totalSlp
    );
    const totalPhp = Math.floor(scholarSlp * this.props.slpPrice);

    const formatted = new Intl.NumberFormat().format(totalPhp);

    return (
      <div className="col-sm">
        Scholar PHP: <b className="text-success">₱{formatted}</b>
      </div>
    );
  }

  renderCard() {
    if (!this.props.scholar) {
      return (
        <div className="text-center mt-1">
          Loading scholar data...
          <div
            className="spinner-border spinner-border-sm mx-3"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      );
    }

    const scholar = this.props.scholar;
    const unclaimed = scholar.total - scholar.claimable_total;
    const unix_timestamp = scholar.last_claimed_item_at;
    const date = new Date(unix_timestamp * 1000);
    // const last_claim = date.toLocaleDateString();
    const dateToday = new Date();
    const differenceInTime = dateToday.getTime() - date.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    const sinceLastClaim = Math.ceil(differenceInDays);
    const dailyAverage = Math.ceil(unclaimed / differenceInDays);

    const clientId = scholar.client_id;
    const first4 = clientId.substring(0, 6);
    const last4 = clientId.slice(-4);

    const shortEthAdd = `${first4}...${last4}`;

    const viewAxieAddrs = clientId.replace("0x", "ronin:");

    return (
      <div className="card my-2 text-dark">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-3">
              <strong className="me-1">{this.props.nickname}</strong>
              <small>{this.props.sharePercentage}%</small>
            </div>
            <div className="col-sm-9">
              <small>Ronin: </small>
              <small className="pe-2">{shortEthAdd}</small>
              <CopyToClipboard text={scholar.client_id}>
                <i style={{ cursor: "pointer" }} className="far fa-copy"></i>
              </CopyToClipboard>
            </div>
            <div className="col-sm"></div>
            <div className="col-sm"></div>
            <div className="text-end">
              <div
                className="btn-group-sm p-1 position-absolute top-0 end-0"
                role="group"
              >
                <a
                  href={`https://marketplace.axieinfinity.com/profile/${viewAxieAddrs}/axie`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="badge bg-secondary">View Axies</span>
                </a>
                <button
                  type="button"
                  className="btn ms-1"
                  onClick={() => {
                    this.props.fetchScholar(this.props.ethAddress);
                  }}
                >
                  <i className="fas fa-redo"></i>
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    this.props.deleteScholar(this.props.ethAddress);
                    this.props.deleteScholarData(this.props.ethAddress);
                  }}
                >
                  <i className="fas fa-user-times text-danger"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body small">
          <div className="row">
            <div className="col-sm">
              Total{" "}
              <img
                className="mb-1"
                src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
                alt="slp"
                height="15px"
                width="15px"
              />
              : <b>{new Intl.NumberFormat().format(scholar.total)}</b>
            </div>
            <div className="col-sm">
              Unclaimed{" "}
              <img
                className="mb-1"
                src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
                alt="slp"
                height="15px"
                width="15px"
              />
              : {new Intl.NumberFormat().format(unclaimed)}
            </div>
            <div className="col-sm">
              Daily Average{" "}
              <img
                className="mb-1"
                src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
                alt="slp"
                height="15px"
                width="15px"
              />
              : {new Intl.NumberFormat().format(dailyAverage)}
            </div>
            <div className="col-sm">
              Days since claim: {new Intl.NumberFormat().format(sinceLastClaim)}
            </div>
          </div>
          <div className="row">
            {this.getScholarTotalSlp(unclaimed)}
            {this.getScholarTotalPhp(unclaimed)}
            {this.getManagerTotalSlp(unclaimed)}
            {this.getManagerTotalPhp(unclaimed)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.renderCard();
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    scholar: state.scholarsData[ownProps.ethAddress],
    sharePercentage: state.scholars[ownProps.ethAddress].sharePercentage,
    nickname: state.scholars[ownProps.ethAddress].nickname,
    slpPrice: state.slpData.slpPrice,
  };
};

export default connect(mapStateToProps, {
  fetchScholar,
  deleteScholar,
  deleteScholarData,
})(ScholarCard);
