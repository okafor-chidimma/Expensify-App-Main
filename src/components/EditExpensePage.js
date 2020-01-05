import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = expenseDetails => {
    console.log(expenseDetails, 'i am expense details');
    // dispatch(editExpense({ id: props.match.params.id }, expense))
    this.props.startEditExpense(this.props.match.params.id, expenseDetails);
    this.props.history.push('/');
  };
  onButtonClick = () => {
    this.props.startRemoveExpense(this.props.match.params.id);
    // dispatch(removeExpense({ id: props.match.params.id }))
    this.props.history.push('/');
  };
  render() {
    // console.log(this.props);

    return (
      <div>
        Editing the expense of {this.props.match.params.id}
        <ExpenseForm
          expense={this.props.expense}
          buttonState='edit'
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onButtonClick}>Remove Item</button>
      </div>
    );
  }
}

// connect method has access to the connected component props by accepting a second parameter which is the props

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => expense.id === props.match.params.id
    )
  };
};
const mapDispatchToProps = dispatch => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: id => dispatch(startRemoveExpense(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
