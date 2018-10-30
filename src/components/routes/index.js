import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from '../LandingPage';
import Login from '../Login';
import NotFound from '../NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact component={NotFound} />
  </Switch>
);

export default Routes;
