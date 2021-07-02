import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signIn, showLoader } from "../actions";

class LoginForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <small className="text-danger float-start">{error}</small>;
    }
  }

  renderInput = ({ input, label, type, meta }) => {
    return (
      <div>
        <small className="text-white float-start">{label}</small>
        <input
          className="form-control form-control-sm"
          placeholder={label}
          aria-label={label}
          type={type}
          {...input}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.signIn(formValues);
    this.props.showLoader();
  };

  renderLoginButton() {
    if (this.props.loading) {
      return (
        <button
          className="btn btn-warning btn-sm col-12 mt-4"
          type="button"
          disabled
        >
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>{" "}
          Login
        </button>
      );
    }

    return (
      <button type="submit" className="btn btn-warning btn-sm col-12 mt-4">
        <i className="fas fa-sign-in-alt"></i> Login
      </button>
    );
  }

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="text-dark"
        >
          <div className="row">
            <div className="col-sm mt-2">
              <Field name="email" component={this.renderInput} label="Email" />
            </div>
            <div className="col-sm mt-2">
              <Field
                name="password"
                component={this.renderInput}
                label="Password"
                type="password"
              />
            </div>
            <div className="col-sm mt-2">{this.renderLoginButton()}</div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "Email required.";
  }

  if (!formValues.password) {
    errors.password = "Password required.";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, loading: state.auth.loading };
};

const formWrapped = reduxForm({
  form: "loginForm",
  validate,
})(LoginForm);

export default connect(mapStateToProps, { signIn, showLoader })(formWrapped);
