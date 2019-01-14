import React, { Component } from "react";
import { connect } from "react-redux";

class FlashMessage extends Component {
  render() {
    console.log(Object.keys(this.props.errors).length);
    if (this.props.errors === "success") {
      return (
        <div className="row justify-content-center">
          <div className={"col-md-4 alert-success "} role="success">
            <p>The new recipe has been saved successfully !</p>
          </div>
        </div>
      );
    } else if (
      Object.keys(this.props.errors).length > 0 &&
      this.props.errors !== "cleared"
    ) {
      return (
        <div className="row justify-content-center">
          <div className={"col-md-4 alert-danger "} role="alert">
            <p>There has been an error. Please try again !</p>
          </div>
        </div>
      );
    } else if (
      this.props.errors === "cleared" ||
      this.props.errors.length <= 0
    ) {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  successMessage: state.flashMessage
});

export default connect(mapStateToProps)(FlashMessage);
