import React from 'react';
import { connect } from 'react-redux';
import { startLoginProcess } from '../actions/auth';
export const Login = ({ startLogin }) => (
  <div>
    <button onClick={startLogin}>Login Page</button>
  </div>
);

// since we want to dispatch the startLoginProcess() to fire up th authentication
const mapDispatchToState = dispatch => {
  return {
    startLogin: () => dispatch(startLoginProcess())
  };
};

export default connect(undefined, mapDispatchToState)(Login);
