import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { location } = rest;
  const user = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { referer: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
