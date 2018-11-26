import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import decode from 'jwt-decode';

export const PrivateRoute = ({ component: Component, ...props }) => {
  const authenticate = token => {
    if (token) {
      const decoded_token = decode(token);
      if (decoded_token.exp > (Date.now()) / 1000) {
        return { decoded_token };
      }
    }
    return false;
  };

  const authenticated = authenticate(localStorage.getItem('auth_token'));

  return (
    <Route
      {...props}
      render={props =>
        (authenticated ? <Component {...props} /> : <Redirect to="/login" />)
      }
    />
  );
};

export default PrivateRoute;
