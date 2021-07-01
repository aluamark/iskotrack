import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { createScholar, fetchScholar } from "../../actions";

import ScholarEmpty from "./ScholarEmpty";

class ScholarCreate extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <small className="text-danger">{error}</small>;
    }
  }

  renderInput = ({ input, label, meta }) => {
    if (input.name === "sharePercentage") {
      return (
        <div>
          <small className="text-white">{label}</small>
          <div className="input-group input-group-sm">
            <input
              className="form-control"
              placeholder={label}
              aria-label={label}
              {...input}
              type="number"
            />
            <span className="input-group-text">%</span>
          </div>
          {this.renderError(meta)}
        </div>
      );
    }

    return (
      <div>
        <small className="text-white">{label}</small>
        <input
          className="form-control form-control-sm"
          placeholder={label}
          aria-label={label}
          {...input}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues, dispatch) => {
    this.props.createScholar(formValues);
    dispatch(reset("scholarCreate"));
  };

  render() {
    if (this.props.isSignedIn) {
      return (
        <div className="container">
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="text-dark"
          >
            <div className="row">
              <div className="col-sm mt-2">
                <Field
                  name="ethAddress"
                  component={this.renderInput}
                  label="Ronin Address"
                />
              </div>
              <div className="col-sm mt-2">
                <Field
                  name="nickname"
                  component={this.renderInput}
                  label="Nickname"
                />
              </div>

              <div className="col-sm mt-2">
                <Field
                  name="sharePercentage"
                  component={this.renderInput}
                  label="Scholar Share"
                />
              </div>
              <div className="col-sm mt-2">
                <button
                  type="submit"
                  className="btn btn-warning btn-sm col-12 mt-4"
                >
                  Add Scholar
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return <ScholarEmpty />;
    }
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.ethAddress) {
    errors.ethAddress = "Address required.";
  }

  if (!formValues.nickname) {
    errors.nickname = "Nickname required.";
  }

  if (!formValues.sharePercentage) {
    errors.sharePercentage = "Share required.";
  }

  if (formValues.sharePercentage < 0 || formValues.sharePercentage > 100) {
    errors.sharePercentage = "Invalid share percentage.";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

const formWrapped = reduxForm({
  form: "scholarCreate",
  initialValues: { sharePercentage: "60" },
  validate,
  reset,
})(ScholarCreate);

export default connect(mapStateToProps, { createScholar, fetchScholar })(
  formWrapped
);
