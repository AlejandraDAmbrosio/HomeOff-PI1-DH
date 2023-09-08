
import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/formingreso" replace />
  );
};

  export default PrivateRoute

  
