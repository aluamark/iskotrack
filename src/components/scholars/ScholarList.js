import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchScholars,
  fetchScholar,
  fetchSlpPrice,
  fetchAxsPrice,
  showReloadLoading,
  hideLoader,
} from "../../actions";

import ScholarCard from "./ScholarCard";
import ScholarForm from "./ScholarForm";
import ScholarEmpty from "./ScholarEmpty";

import history from "../../history";

class ScholarList extends Component {
  state = {
    scholarCount: 0,
  };

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.fetchScholars();
    } else {
      history.push("/");
    }

    this.props.fetchAxsPrice();
    this.props.fetchSlpPrice();
    this.props.hideLoader();

    setInterval(this.props.fetchAxsPrice, 180000);
    setInterval(this.props.fetchSlpPrice, 180000);
  }

  renderList = () => {
    const scholarCards = this.props.scholars.map((scholar) => {
      return (
        <ScholarCard
          nickname={scholar.nickname}
          ethAddress={scholar.ethAddress}
          key={scholar.ethAddress}
        />
      );
    });

    return scholarCards;
  };

  renderListTotal = () => {
    let scholarCount = 0;

    this.props.scholars.forEach(() => {
      scholarCount++;
    });

    return scholarCount;
  };

  renderTotal() {
    let totalSlp = 0;
    let totalPhp = 0;
    let totalScholarSlp = 0;
    let totalScholarPhp = 0;
    let totalManagerSlp = 0;
    let totalManagerPhp = 0;
    this.props.scholarsData.forEach((scholar) => {
      totalSlp = totalSlp + scholar.total;
      totalPhp = Math.floor(totalSlp * this.props.slpPrice);

      const filteredScho = this.props.scholars.filter((scho) => {
        return scho.ethAddress === scholar.client_id;
      });

      const scholarShare = filteredScho[0].sharePercentage;
      const scholarSlp = (scholarShare / 100) * scholar.total;

      totalScholarSlp = Math.floor(totalScholarSlp + scholarSlp);
      totalScholarPhp = Math.floor(totalScholarSlp * this.props.slpPrice);

      totalManagerSlp = totalSlp - totalScholarSlp;
      totalManagerPhp = totalPhp - totalScholarPhp;
    });

    return (
      <div>
        <div className="row mt-2 px-3">
          {/* <h6 className="col-sm small font-weight-bold text-info">
            Total PHP:{" "}
            <strong className="text-white total">
              ₱{new Intl.NumberFormat().format(totalPhp)}
            </strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            Total{" "}
            <img
              className="mb-1"
              src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
              alt="slp"
              height="15px"
              width="15px"
            />
            :{" "}
            <strong className="text-white total">
              {new Intl.NumberFormat().format(totalSlp)}
            </strong>
          </h6> */}
          <h6 className="col-sm small font-weight-bold text-info">
            AXS{" "}
            <img
              className="mb-1"
              src="https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png?1604471082"
              alt="slp"
              height="15px"
              width="15px"
            />
            :{" "}
            <strong className="text-white total">
              ₱{new Intl.NumberFormat().format(this.props.axsPrice)}
            </strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            SLP{" "}
            <img
              className="mb-1"
              src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
              alt="slp"
              height="15px"
              width="15px"
            />
            :{" "}
            <strong className="text-white total">
              ₱{new Intl.NumberFormat().format(this.props.slpPrice)}
            </strong>
          </h6>
        </div>
        <div className="row px-3">
          {/* <h6 className="col-sm small font-weight-bold text-info">
            Scholar{" "}
            <img
              className="mb-1"
              src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
              alt="slp"
              height="15px"
              width="15px"
            />
            :{" "}
            <strong className="text-white total">
              {new Intl.NumberFormat().format(totalScholarSlp)}
            </strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            Scholar PHP:{" "}
            <strong className="text-white total">
              ₱{new Intl.NumberFormat().format(totalScholarPhp)}
            </strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            Manager{" "}
            <img
              className="mb-1"
              src="https://assets.coingecko.com/coins/images/10366/large/SLP.png?1578640057"
              alt="slp"
              height="15px"
              width="15px"
            />
            :{" "}
            <strong className="text-white total">
              {new Intl.NumberFormat().format(totalManagerSlp)}
            </strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            Manager PHP:{" "}
            <strong className="text-white total">
              ₱{new Intl.NumberFormat().format(totalManagerPhp)}
            </strong>
          </h6> */}
        </div>
      </div>
    );
  }

  refresh = () => {
    this.props.showReloadLoading();
    setTimeout(() => {
      this.props.hideLoader();
    }, 5000);
    return this.props.scholars.forEach((scholar) => {
      this.props.fetchScholar(scholar.ethAddress);
    });
  };

  renderReloadButton() {
    if (this.props.reloadLoading) {
      return (
        <button
          className="btn btn-success btn-sm float-end"
          onClick={() => {
            this.refresh();
          }}
        >
          <span
            className="spinner-border spinner-border-sm px-1"
            role="status"
            aria-hidden="true"
          ></span>{" "}
          Reload Data
        </button>
      );
    }

    return (
      <button
        className="btn btn-success btn-sm float-end"
        onClick={() => {
          this.refresh();
        }}
      >
        <i className="fas fa-redo pe-1"></i>
        Reload
      </button>
    );
  }

  render() {
    if (this.props.isSignedIn) {
      return (
        <div className="container text-white">
          <ScholarForm />
          <hr />
          <div className="container">
            <div className="row mb-1">
              <div className="col-7">
                <h4 className="col-sm text-warning">
                  Scholars: {this.renderListTotal()}
                </h4>
              </div>
              <div className="col-5">{this.renderReloadButton()}</div>
            </div>
          </div>

          <div className="container">
            <div className="card bg-secondary">{this.renderTotal()}</div>
            {this.renderList()}
          </div>
        </div>
      );
    } else {
      return <ScholarEmpty />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    scholars: Object.values(state.scholars),
    scholarsData: Object.values(state.scholarsData),
    slpPrice: state.slpData.slpPrice,
    axsPrice: state.slpData.axsPrice,
    loading: state.auth.loading,
    reloadLoading: state.auth.reloadLoading,
  };
};

export default connect(mapStateToProps, {
  fetchScholars,
  fetchScholar,
  fetchSlpPrice,
  fetchAxsPrice,
  showReloadLoading,
  hideLoader,
})(ScholarList);
