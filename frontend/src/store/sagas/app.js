import { call, put } from 'redux-saga/effects';
import api from '../../config/api';
import { Creators as AppActions } from '../ducks/app';
import { Creators as MessageActions } from '../ducks/message';

export function* getTokenReverse() {
  try {
    const {
      data: { token_reverse },
    } = yield call(api.post, '/twitter/reverse');
    window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${token_reverse}&force_login=false`;
  } catch (err) {
    yield put(AppActions.getUserTokenFailure());
    yield put(MessageActions.setMessageError(err.message));
  }
}
