import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../../contexts';

const AuthRoute = ({ path, location, component: Component, ...rest }) => {
  const referer = (location.state && location.state.referer) || '/';
  const user = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to={referer} /> : <Component {...props} />)}
    />
  );
};

export default AuthRoute;
