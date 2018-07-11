import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Creators as AppCreators } from '../../store/ducks/app';
import { Container, Button } from './styles';

class TwitterButtonLogin extends Component {
  onLoginTwitter = () => {
    this.props.getTokenReverseRequest();
  };

  render() {
    if (this.props.app.loading) {
      return <span>Redirecting...</span>;
    }

    return (
      <Container>
        <Button type="button" onClick={this.onLoginTwitter}>
          Entrar com Twitter
        </Button>
      </Container>
    );
  }
}

TwitterButtonLogin.propTypes = {
  getTokenReverseRequest: PropTypes.func.isRequired,
  app: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = dispatch => bindActionCreators(AppCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitterButtonLogin);
