import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Creators as AppCreators } from '../../store/ducks/app';
import { Container } from './styles';

class TwitterHeader extends Component {
  logout = () => {
    this.props.userLogout();
  };

  render() {
    return (
      <Container>
        <span>@{this.props.username}</span>
        <button type="button" onClick={this.logout}>
          Log out
        </button>
      </Container>
    );
  }
}

TwitterHeader.propTypes = {
  username: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  username: state.app.user.screen_name,
});

const mapDispatchToProps = dispatch => bindActionCreators(AppCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitterHeader);
