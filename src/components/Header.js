import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogOutProcess } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header className='header'>
    <div className='content-container'>
      <div className="header__content">
        <Link className='header__title' to='/dashboard'>
          <h1>Expensify</h1>
        </Link>
        <button onClick={startLogout} className="button button--link">Log out</button>
      </div>
    </div>

    {
      // <NavLink to="/edit/:id" activeClassName="is-active">Edit</NavLink>
      // <NavLink to='/help' activeClassName='is-active'>
      //   Help
      // </NavLink>
      //  <NavLink to='/create' activeClassName='is-active'>
      //    Create Expense
      //  </NavLink>
    }
  </header>
);

const matchDispatchToState = dispatch => ({
  startLogout: () => dispatch(startLogOutProcess())
});
export default connect(undefined, matchDispatchToState)(Header);
