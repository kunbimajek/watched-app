import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
 
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={( {location} ) => getToken() 
        ? children
        : <Redirect to={{ pathname: '/', state: { from: location } }} />
      }
    />
  )
}
 
export default PrivateRoute;