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
    return this.props.scholars.map((scholar) => {
      return (
        <ScholarCard
          nickname={scholar.nickname}
          ethAddress={scholar.ethAddress}
          key={scholar.ethAddress}
        />
      );
    });
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
          <h6 className="col-sm small font-weight-bold text-info">
            Total PHP: <strong className="text-white total">{totalPhp}</strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            Total SLP: <strong className="text-white total">{totalSlp}</strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            AXS in PHP:{" "}
            <strong className="text-white total">{this.props.axsPrice}</strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            SLP in PHP:{" "}
            <strong className="text-white total">{this.props.slpPrice}</strong>
          </h6>
        </div>
        <div className="row px-3">
          <h6 className="col-sm small font-weight-bold text-info">
            Scholar SLP:{" "}
            <strong className="text-white total">{totalScholarSlp}</strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            Scholar PHP:{" "}
            <strong className="text-white total">{totalScholarPhp}</strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            Manager SLP:{" "}
            <strong className="text-white total">{totalManagerSlp}</strong>
          </h6>
          <h6 className="col-sm small font-weight-bold text-info">
            Manager PHP:{" "}
            <strong className="text-white total">{totalManagerPhp}</strong>
          </h6>
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
        Reload Data
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
            <div className="row">
              <div className="col-6">
                <h3 className="col-12 text-warning">Scholars</h3>
              </div>
              <div className="col-6">{this.renderReloadButton()}</div>
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
