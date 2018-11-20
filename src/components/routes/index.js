import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../landingPage/LandingPage';
import Login from '../login/Login';
import NotFound from '../notFound/NotFound';
import RegisterUser from '../register/RegisterUser';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profiles/Profile';
import CreateArticle from '../Articles/CreateArticle';
import Comments from '../comments/Comments';
import EditArticle from '../Articles/EditArticle';
import ResetPassword from '../resetPassword/ResetPasswordPage';
import ForgotPassword from '../resetPassword/ForgotPasswordPage';
import UpdateComment from '../comments/UpdateComment';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={RegisterUser} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/reset-password/:token" component={ResetPassword} />
    <Route exact path="/profiles/:username" component={Profile} />
    <Route exact path="/create-article" component={CreateArticle} />
    <Route exact path="/articles/:article/comments/" component={Comments} />
    <Route exact path="/article/:slug" component={EditArticle} />
    <Route exact path="/articles/:article/comments/:id/" component={UpdateComment} />
    <Route exact component={NotFound} />
  </Switch>
);

export default Routes;
