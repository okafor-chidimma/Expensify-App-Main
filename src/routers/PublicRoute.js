import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        // these props are coming from the <Route/> and to pass props to a component rendered using react router we pass a function to the render prop of the Router
        return isAuthenticated ? (
          <Redirect to='/dashboard' />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  // using !! so we can get the boolean value of True, if uid is set or False if it is not
  isAuthenticated: !!state.auth.uid
});
export default connect(mapStateToProps)(PublicRoute);
