import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Creators as TwitterCreators } from '../../store/ducks/twitter';
import { Creators as AppCreators } from '../../store/ducks/app';
import TwitterButtonLogin from '../TwitterButtonLogin';
import TwitterList from '../TwitterList';
import TwitterNew from '../TwitterNew';
import TwitterHeader from '../TwitterHeader';
import { Container, Loading } from './styles';
import Message from '../Message';

class Twitter extends Component {
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.props.setUserToken({ ...user, authenticated: true });
    } else {
      this.props.setUserToken({ ...user, authenticated: false });
    }
  }

  render() {
    if (this.props.user.loading) {
      return <Loading>Loading...</Loading>;
    }

    if (this.props.user.authenticated) {
      return (
        <Container>
          <Message />
          <TwitterHeader />
          <TwitterNew />
          <TwitterList />
        </Container>
      );
    }

    return <TwitterButtonLogin {...this.props} />;
  }
}

Twitter.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.app.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...TwitterCreators,
    ...AppCreators,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Twitter);
