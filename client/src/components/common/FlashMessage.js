import React, { Component } from "react";
import { connect } from "react-redux";

class FlashMessage extends Component {
  render() {
    if (this.props.errors && this.props.errors.errors === "success") {
      return (
        <div className="row justify-content-center">
          <div className={"col-md-4 alert-success "} role="success">
            <p>The new recipe has been saved successfully !</p>
          </div>
        </div>
      );
    } else if (this.props.errors && this.props.errors.errors === "error") {
      return (
        <div className="row justify-content-center">
          <div className={"col-md-4 alert-danger "} role="alert">
            <p>There has been an error. Please try again !</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  successMessage: state.flashMessage
});

export default connect(mapStateToProps)(FlashMessage);
