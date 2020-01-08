import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogOutProcess } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify</h1>

    <NavLink to='/dashboard' activeClassName='is-active'>
      My Dashboard
    </NavLink>
    <NavLink to='/create' activeClassName='is-active'>
      Create Expense
    </NavLink>
    {
      // <NavLink to="/edit/:id" activeClassName="is-active">Edit</NavLink>
      // <NavLink to='/help' activeClassName='is-active'>
      //   Help
      // </NavLink>
    }
    <button onClick={startLogout}>Log out</button>
  </header>
);

const matchDispatchToState = dispatch => ({
  startLogout: () => dispatch(startLogOutProcess())
});
export default connect(undefined, matchDispatchToState)(Header);
