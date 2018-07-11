import { all, takeLatest } from 'redux-saga/effects';
import { Types as TwitterTypes } from '../ducks/twitter';
import { Types as AppTypes } from '../ducks/app';
import { getTweets, validateToken, addTweet } from './twitter';
import { getTokenReverse } from './app';

export default function* rootSaga() {
  yield all([takeLatest(TwitterTypes.GET_LIST_REQUEST, getTweets)]);
  yield all([takeLatest(TwitterTypes.VALIDATE_TOKEN_REQUEST, validateToken)]);
  yield all([takeLatest(TwitterTypes.ADD_TWEET_REQUEST, addTweet)]);
  yield all([takeLatest(AppTypes.GET_TOKEN_REVERSE_REQUEST, getTokenReverse)]);
}
