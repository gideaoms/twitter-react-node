import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Creators as TwitterCreators } from '../../store/ducks/twitter';
import { Container } from './styles';

class TwitterNew extends Component {
  state = {
    textInputTweet: '',
  };

  sendTweet = async () => {
    const { textInputTweet } = this.state;
    this.props.addTweet(textInputTweet, () => this.setState({ textInputTweet: '' }));
  };

  render() {
    return (
      <Container>
        <input
          type="text"
          value={this.state.textInputTweet}
          onChange={e => this.setState({ textInputTweet: e.target.value })}
        />
        <button type="button" onClick={this.sendTweet}>
          Enviar Tweet
        </button>
      </Container>
    );
  }
}

TwitterNew.propTypes = {
  addTweet: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(TwitterCreators, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(TwitterNew);
