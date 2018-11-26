import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../landingPage/LandingPage';
import Login from '../login/Login';
import Logout from '../login/Logout';
import NotFound from '../notFound/NotFound';
import RegisterUser from '../register/RegisterUser';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profiles/Profile';
import CreateArticle from '../Articles/CreateArticle';
import Comments from '../comments/Comments';
import EditArticle from '../Articles/EditArticle';
import ResetPassword from '../resetPassword/ResetPasswordPage';
import ForgotPassword from '../resetPassword/ForgotPasswordPage';
import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <PrivateRoute exact path="/signup" component={RegisterUser} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/reset-password/:token" component={ResetPassword} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/profiles/:username" component={Profile} />
    <PrivateRoute exact path="/create-article" component={CreateArticle} />
    <PrivateRoute exact path="/articles/:article/comments/" component={Comments} />
    <PrivateRoute exact path="/article/:slug" component={EditArticle} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
