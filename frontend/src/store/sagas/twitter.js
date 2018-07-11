import { call, put, select } from 'redux-saga/effects';
import api from '../../config/api';
import { Creators as TwitterActions } from '../ducks/twitter';
import { Creators as MessageActions } from '../ducks/message';

export function* getTweets() {
  try {
    const user = yield select(state => state.app.user);
    const response = yield call(api.get, '/twitter/tweets', {
      params: {
        access_token_key: user.oauth_token,
        access_token_secret: user.oauth_token_secret,
        user_id: user.user_id,
      },
    });
    yield put(TwitterActions.getTweetsSuccess(response.data));
  } catch (err) {
    yield put(TwitterActions.getTweetsFailure(err.data.message));
    yield put(MessageActions.setMessageError(err.data.message));
  }
}

export function* validateToken(action) {
  try {
    const { data } = yield api.post('/twitter/token', {
      oauth_token: action.payload.oauth_token,
      oauth_verifier: action.payload.oauth_verifier,
    });
    localStorage.setItem('user', JSON.stringify(data));
    yield put(
      TwitterActions.validateTokenSuccess(
        action.payload.oauth_token,
        action.payload.oauth_verifier,
      ),
    );
  } catch (err) {
    yield put(MessageActions.setMessageError(err.data.message));
  }
}

export function* addTweet(action) {
  try {
    const user = yield select(state => state.app.user);
    yield api.post('/twitter/add', {
      tweet: action.payload.text,
      access_token_key: user.oauth_token,
      access_token_secret: user.oauth_token_secret,
    });
    action.payload.resetText();
    yield put(TwitterActions.getTweetsRequest());
    yield put(MessageActions.setMessageSuccess('Tweet added successfuly'));
  } catch (err) {
    yield put(MessageActions.setMessageError(err.data.message));
  }
}
