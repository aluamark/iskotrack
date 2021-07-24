import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchScholar,
  deleteScholar,
  deleteScholarData,
  updateDailyAverage,
  fetchAxies,
} from "../../actions";

import { CopyToClipboard } from "react-copy-to-clipboard";

class ScholarCard extends Component {
  componentDidMount() {
    this.props.fetchScholar(this.props.ethAddress);
    this.props.fetchAxies(this.props.ethAddress);
  }

  getManagerTotalSlp(totalSlp) {
    const scholarSlp = (this.props.sharePercentage / 100) * totalSlp;
    const managerSlp = Math.round(totalSlp - scholarSlp);

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
    const managerPhp = Math.round(
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
    const scholarSlp = Math.round(
      (this.props.sharePercentage / 100) * totalSlp
    );

    const formatted = new Intl.NumberFormat().format(scholarSlp);

    return (
      <div className="col-sm">
        {this.props.email === "aluamark@gmail.com" ? "Total" : "Scholar"}{" "}
        <img
          className="mb-1"
          src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
          alt="slp"
          height="15px"
          width="15px"
        />
        : <b className="text-success">{formatted}</b>
      </div>
    );
  }

  getScholarTotalPhp(totalSlp) {
    const scholarSlp = Math.floor(
      (this.props.sharePercentage / 100) * totalSlp
    );
    const totalPhp = Math.round(scholarSlp * this.props.slpPrice);

    const formatted = new Intl.NumberFormat().format(totalPhp);

    return (
      <div className="col-sm">
        {this.props.email === "aluamark@gmail.com" ? "Total" : "Scholar"} PHP:{" "}
        <b className="text-success">₱{formatted}</b>
      </div>
    );
  }

  renderAxies() {
    if (!this.props.scholarsAxies) {
      return (
        <small>
          <div
            className="spinner-border spinner-border-sm ms-2 me-4"
            role="status"
            aria-hidden="true"
          ></div>
          <div
            className="spinner-border spinner-border-sm me-4"
            role="status"
            aria-hidden="true"
          ></div>
          <div
            className={`spinner-border spinner-border-sm ${
              this.props.email === "aluamark@gmail.com" ? "me-3" : ""
            } `}
            role="status"
            aria-hidden="true"
          ></div>
        </small>
      );
    } else {
      return (
        <small>
          <img
            className="mb-1"
            src={this.props.scholarsAxies.axie0}
            alt="slp"
            height={this.props.email === "aluamark@gmail.com" ? "40px" : "30px"}
            width={this.props.email === "aluamark@gmail.com" ? "50px" : "40px"}
          />
          <img
            className="mb-1"
            src={this.props.scholarsAxies.axie1}
            alt="slp"
            height={this.props.email === "aluamark@gmail.com" ? "40px" : "30px"}
            width={this.props.email === "aluamark@gmail.com" ? "50px" : "40px"}
          />
          <img
            className="mb-1"
            src={this.props.scholarsAxies.axie2}
            alt="slp"
            height={this.props.email === "aluamark@gmail.com" ? "40px" : "30px"}
            width={this.props.email === "aluamark@gmail.com" ? "50px" : "40px"}
          />
        </small>
      );
    }
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

    this.props.updateDailyAverage(clientId, dailyAverage);

    if (this.props.email !== "aluamark@gmail.com") {
      return (
        <div className="card my-2 text-dark">
          <div className="card-header">
            <div className="row">
              <div className="col-sm">
                <small>Ronin: </small>
                <small className="pe-2">{shortEthAdd}</small>
                <CopyToClipboard text={scholar.client_id}>
                  <i style={{ cursor: "pointer" }} className="far fa-copy"></i>
                </CopyToClipboard>
              </div>
              <div className="col-sm">
                <strong className="me-1">{this.props.nickname}</strong>
              </div>
              <div className="col-sm">{this.renderAxies()}</div>
              <div className="col-sm">
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
                        this.props.fetchAxies(this.props.ethAddress);
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
          </div>
          <div className="card-body small">
            <div className="row">
              <div className="col-sm">
                {sinceLastClaim > 14 ? "Claimable" : "Unclaimable"}{" "}
                <img
                  className="mb-1"
                  src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
                  alt="slp"
                  height="15px"
                  width="15px"
                />
                : <b>{new Intl.NumberFormat().format(unclaimed)}</b>
              </div>
              <div className="col-sm">
                Share Percentage: {this.props.sharePercentage}%
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
                Days since claim:{" "}
                {new Intl.NumberFormat().format(sinceLastClaim)}
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
    } else {
      return (
        <div className="card my-2 text-dark">
          <div className="card-header">
            <div className="row">
              <div className="col-sm">
                <strong className="me-1">{this.props.nickname}</strong>
                <small>{this.props.sharePercentage}%</small>
              </div>
              <div className="col-sm">
                <small>Ronin: </small>
                <small className="pe-2">{shortEthAdd}</small>
                <CopyToClipboard text={scholar.client_id}>
                  <i style={{ cursor: "pointer" }} className="far fa-copy"></i>
                </CopyToClipboard>
              </div>
              <div className="col-sm"></div>
              <div className="col-sm">
                <div className="text-end">
                  <div
                    className="btn-group-sm p-1 position-absolute top-0 end-0"
                    role="group"
                  >
                    {this.renderAxies()}

                    {/* REMOVE COMMENT TO OPEN SCHOLAR OPTIONS */}
                    {/* <a
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
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body small">
            <div className="row">
              {this.getScholarTotalSlp(unclaimed)}
              {this.getScholarTotalPhp(unclaimed)}
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
                Days since claim:{" "}
                {new Intl.NumberFormat().format(sinceLastClaim)}
              </div>
            </div>
          </div>
        </div>
      );
    }
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
    email: state.auth.email,
    scholarsAxies: state.scholarsAxies[ownProps.ethAddress],
  };
};

export default connect(mapStateToProps, {
  fetchScholar,
  deleteScholar,
  deleteScholarData,
  updateDailyAverage,
  fetchAxies,
})(ScholarCard);
