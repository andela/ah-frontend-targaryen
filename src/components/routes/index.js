import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from '../landingPage/LandingPage';
import Login from '../login/Login';
import NotFound from '../notFound/NotFound';
import RegisterUser from '../register/RegisterUser';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profiles/Profile';
import ResetPasswordPage from '../resetPassword/ResetPasswordPage';
import ForgotPasswordPage from '../resetPassword/ForgotPasswordPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={RegisterUser} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/profiles/:username" component={Profile} />
    <Route exact path="/forgot-password" component={ForgotPasswordPage} />
    <Route exact path="/reset-password/:token" component={ResetPasswordPage} />
    <Route exact component={NotFound} />
  </Switch>
);

export default Routes;
