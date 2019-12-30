import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpense from '../selectors/expenses';

export const ExpenseList = ({ expenses }) => (
  <div>
    <h1>Expense List</h1>
    {
      expenses.length === 0 ? (
        <p>No expenses Yet</p>
      ) : (
          expenses.map((expense) => {
            return (
              <ExpenseListItem
                {...expense}
                key={expense.id}
              />
            )
          })
        )
    }
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

const mapStateToProps = (state) => {
  return {
    expenses: getVisibleExpense(state.expenses, state.filters)
  }
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
