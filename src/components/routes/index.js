import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from '../landingPage/LandingPage';
import Login from '../login/Login';
import NotFound from '../notFound/NotFound';
import RegisterUser from '../register/RegisterUser';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={RegisterUser} />
    <Route exact component={NotFound} />
  </Switch>
);

export default Routes;
