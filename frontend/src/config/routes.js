import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Twitter from '../components/Twitter';
import TwitterValidate from '../components/TwitterValidate';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Twitter} />
      <Route exact path="/validate" component={TwitterValidate} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
