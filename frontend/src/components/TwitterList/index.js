import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Creators as TwitterCreators } from '../../store/ducks/twitter';
import { Container, Loading } from './styles';

class TwitterList extends Component {
  componentDidMount() {
    this.props.getTweetsRequest();
  }

  render() {
    if (this.props.twitter.loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <Container>
        <button type="button" onClick={this.props.getTweetsRequest}>
          Refresh
        </button>
        <ul>
          {this.props.twitter.data.map(({ id, text }) => (
            <li key={id}>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}

TwitterList.propTypes = {
  getTweetsRequest: PropTypes.func.isRequired,
  twitter: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = state => ({
  twitter: state.twitter.list,
});

const mapDispatchToProps = dispatch => bindActionCreators(TwitterCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitterList);
