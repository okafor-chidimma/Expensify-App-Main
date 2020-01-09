import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpense from '../selectors/expenses';

export const ExpenseList = ({ expenses }) => (
  <div className='content-container'>
    <div className='list-header'>
      <div className='show-for-mobile'>Expenses</div>
      <div className='show-for-desktop'>Expenses</div>
      <div className='show-for-desktop'>Amount</div>
    </div>
    <div className='list-body'>
      {expenses.length === 0 ? (
        <div className='list-item list-item--message'>
          <span>No expenses</span>
        </div>
      ) : (
        expenses.map(expense => {
          return <ExpenseListItem {...expense} key={expense.id} />;
        })
      )}
    </div>
    {
      // props.expenses.map(({ description, amount, createdAt, id }) => {
      //   return (
      //     <ExpenseListItem
      //       description={description}
      //       amount={amount}
      //       createdAt={createdAt}
      //       key={id}
      //     />
      //   )
      // })
    }
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: getVisibleExpense(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);

// it can re-written as

// const ConnectedExpenseList = connect((state) => {
//   return {
//     expenses: state.expenses,
//     filters: state.filters

//   }
// })(ExpenseList);
// export default ConnectedExpenseList;
