import { combineReducers } from 'redux';
import twitter from './twitter';
import app from './app';
import message from './message';

export default combineReducers({
  twitter,
  app,
  message,
});
