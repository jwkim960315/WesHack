import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const cookies = new Cookies();
  const appUsername = cookies.get('appUsername');

  if (appUsername == null) {
    return <Redirect to="/" />;
  }

  return (
    <Route {...rest} render={() => <Component appUsername={appUsername} />} />
  );
};

export default PrivateRoute;
