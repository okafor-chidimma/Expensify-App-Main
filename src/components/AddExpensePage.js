import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
export class AddExpensePage extends React.Component {
  onSubmit = expenseDetails => {
    console.log(expenseDetails, 'i am expense details');
    this.props.startAddExpense(expenseDetails);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h1>Add Expense Page</h1>
        <ExpenseForm buttonState='create' onSubmit={this.onSubmit} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  // this dispatch sends the function to the store
  startAddExpense: expense => dispatch(startAddExpense(expense))
});
//             connect(mapStateToProps,mapDispatchToProps)
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
