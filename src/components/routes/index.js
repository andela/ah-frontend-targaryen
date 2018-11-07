import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from '../landingPage/LandingPage';
import Login from '../login/Login';
import NotFound from '../notFound/NotFound';
import RegisterUser from '../register/RegisterUser';
// import ViewArticle from '../Articles/SingleArticle';
import Articles from '../Articles/Articles';
import NewArticle from '../Articles/NewArticle';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={RegisterUser} />
    <Route exact path="/articles" component={Articles} />
    <Route exact path="/new-article" component={NewArticle} />
    <Route exact component={NotFound} />
  </Switch>
);

export default Routes;
