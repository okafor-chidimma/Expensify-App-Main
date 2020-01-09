import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import getVisibleExpense from '../selectors/expenses';
import getExpenseTotal from '../selectors/expenses-total';

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
  const title = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedFigure = `#${numeral(expenseTotal / 100).format('0,0.00')}`;
  return (
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>
          Viewing <span>{expenseCount}</span> {title} totalling{' '}
          <span>{formattedFigure}</span>
        </h1>
        <div className='page-header__actions'>
          <Link className='button' to='/create'>
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpense = getVisibleExpense(state.expenses, state.filters);
  return {
    expenseCount: visibleExpense.length,
    expenseTotal: getExpenseTotal(visibleExpense)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
