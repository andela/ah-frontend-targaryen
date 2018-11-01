import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from '../landingPage/LandingPage';
import Login from '../login/Login';
import NotFound from '../notFound/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact component={NotFound} />
  </Switch>
);

export default Routes;
