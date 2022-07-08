import React, { Component } from "react";
import { Message, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

class SuccessNotification extends Component {
  handleDismiss = () => {
    this.props.onClose(false);
  };

  render() {
    return (
      <Message
        icon
        positive
        className="notification"
        onDismiss={this.handleDismiss}
        color="green"
      >
        <Icon name="check circle fs-24" data-testid="notificaton-icon" />
        <span className="fs-16 color-black" data-testid="message">
          {this.props.title}&nbsp;{this.props.message}
        </span>
      </Message>
    );
  }
}

SuccessNotification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default SuccessNotification;