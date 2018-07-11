import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as MessageActions } from '../../store/ducks/message';
import { Container } from './styles';

class Message extends Component {
  render() {
    return (
      this.props.notification.visible && (
        <Container type={this.props.notification.message.type}>
          <p>{this.props.notification.message.text}</p>
          <button type="button" onClick={this.props.hideMessage}>
            x
          </button>
        </Container>
      )
    );
  }
}

Message.propTypes = {
  hideMessage: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
    message: PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  notification: state.message,
});

const mapDispatchToProps = dispatch => bindActionCreators(MessageActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Message);
