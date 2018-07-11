import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Creators as TwitterCreators } from '../../store/ducks/twitter';
import { Loading } from './styles';

class TwitterValidate extends Component {
  componentDidMount() {
    const { oauth_token, oauth_verifier } = queryString.parse(this.props.location.search);
    this.props.validateTokenRequest(oauth_token, oauth_verifier);
  }

  render() {
    if (this.props.twitter.validate.loading) {
      return <Loading>Validating...</Loading>;
    }

    return <Redirect to="/" />;
  }
}

TwitterValidate.propTypes = {
  validateTokenRequest: PropTypes.func.isRequired,
  twitter: PropTypes.shape({
    validate: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  twitter: state.twitter,
});

const mapDispatchToProps = dispatch => bindActionCreators(TwitterCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitterValidate);
