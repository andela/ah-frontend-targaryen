import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../landingPage/LandingPage';
import Login from '../login/Login';
import NotFound from '../notFound/NotFound';
import RegisterUser from '../register/RegisterUser';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profiles/Profile';
import NewArticle from '../Articles/NewArticle';
import Comments from '../comments/Comments';
import ViewArticle from '../Articles/ViewArticle';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={RegisterUser} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/profiles/:username" component={Profile} />
    <Route exact path="/create-article" component={NewArticle} />
    <Route exact path="/articles/:article/comments/" component={Comments} />
    <Route exact path="/article/:slug" component={ViewArticle} />
    <Route exact component={NotFound} />
  </Switch>
);

export default Routes;
