import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signIn } from "../actions";

class LoginForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <small className="text-danger">{error}</small>;
    }
  }

  renderInput = ({ input, label, type, meta }) => {
    return (
      <div>
        <small className="text-white">{label}</small>
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
    localStorage.setItem("user", formValues);
  };

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
            <div className="col-sm mt-2">
              <button
                type="submit"
                className="btn btn-warning btn-sm col-12 mt-4"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// const validate = (formValues) => {
//   const errors = {};

//   if (!formValues.ethAddress) {
//     errors.ethAddress = "Address required.";
//   }

//   const valid = WAValidator.validate(formValues.ethAddress, "ETH");

//   if (!valid) {
//     errors.ethAddress = "Invalid ETH address.";
//   }

//   if (!formValues.nickname) {
//     errors.nickname = "Nickname required.";
//   }

//   if (!formValues.sharePercentage) {
//     errors.sharePercentage = "Share required.";
//   }

//   if (formValues.sharePercentage < 0 || formValues.sharePercentage > 100) {
//     errors.sharePercentage = "Invalid share percentage.";
//   }

//   return errors;
// };

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

const formWrapped = reduxForm({
  form: "loginForm",
  // validate,
})(LoginForm);

export default connect(mapStateToProps, { signIn })(formWrapped);

// Date Input
// import date from "date-and-time";

// renderDateInput({ input, label }) {
//   const now = new Date();
//   const dateAndTime = date.format(now, "YYYY-MM-DDTHH:mm:ss");

//   return (
//     <div className="col col-lg-12 mb-3">
//       <div className="form-group">
//         <label className="form-label fw-bold">{label}</label>
//         <input
//           className="form-control"
//           type="datetime-local"
//           {...input}
//           value={dateAndTime}
//         ></input>
//       </div>
//     </div>
//   );
// }
