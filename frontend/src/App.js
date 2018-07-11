import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import './config/reactotron';
import Routes from './config/routes';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Fragment>      
      <Routes />
    </Fragment>
  </Provider>
);

export default App;
