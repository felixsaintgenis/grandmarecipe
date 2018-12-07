import React, { Component } from "react";
import { connect } from "react-redux";

class FlashMessage extends Component {
  render() {
    const { message, messageType } = this.props.flashMessage;
    if (!message) {
      return null;
    }

    if (messageType === "alert") {
      return (
        <div className="row">
          <div className={"col-md-12 alert alert-danger "} role="alert">
            {message}
          </div>
        </div>
      );
    }

    if (messageType === "success") {
      return (
        <div className="row">
          <div className={"col-md-12 alert-success "} role="success">
            {message}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  flashMessage: state.flashMessage
});

export default connect(mapStateToProps)(FlashMessage);
