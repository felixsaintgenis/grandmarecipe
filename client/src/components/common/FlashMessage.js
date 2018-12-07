import React, { Component } from "react";
import { connect } from "react-redux";

class FlashMessage extends Component {
  render() {
    if (this.props.errors && this.props.errors.errors) {
      return (
        <div className="row">
          <div className={"col-md-12 alert-danger "} role="success">
            <p>danger</p>
          </div>
        </div>
      );
    } else if (this.props.errors && !this.props.errors.errors) {
      return (
        <div className="row">
          <div className={"col-md-12 alert alert-success "} role="alert">
            <p>success</p>
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
