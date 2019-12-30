import React, { Component } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends Component {
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    note: this.props.expense ? this.props.expense.note : '',
    amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
    createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(),
    calendarFocused: false,
    error: ''
  }
  handleAddDescription = (event) => {
    const description = event.target.value;
    this.setState(() => ({
      description
    }));
  };
  handleAddNote = (event) => {
    const note = event.target.value;
    this.setState(() => ({
      note
    }));
  };
  handleAddAmount = (event) => {
    const amount = event.target.value;
    // this condition is for users to be able to clear their input
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    } else {
      console.log('invalid amount');
      this.setState(() => ({ error: 'Invalid Input For Amount' }));
    }
  };
  onDateChange = (date) => {
    if (date) {
      this.setState({
        createdAt: date
      })
    }

  }
  onFocusChange = ({ focused }) => {
    this.setState({
      calendarFocused: focused
    })
  }
  onFormSubmit = (event) => {
    event.preventDefault();
    if (!this.state.description || !this.state.amount) {
      console.log('i should have error');
      this.setState(() => ({ error: 'Please neither amount nor description can be empty' }));
    } else {
      this.setState(() => ({ error: '' }));
      console.log('submitted');
      this.props.onSubmit({
        description: this.state.description,
        note: this.state.note,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  }
  render() {
    return (
      <div>
        {
          this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>
        }
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.handleAddDescription}
          />
          <input
            type="text"
            placeholder="amount"
            value={this.state.amount}
            onChange={this.handleAddAmount}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Enter a note for the expense"
            value={this.state.note}
            onChange={this.handleAddNote}
          ></textarea>
          <button>
            {this.props.buttonState === "edit" ? 'Edit Expense' : 'Add Expense'}
          </button>
        </form>
      </div>
    )
  }
};

export default ExpenseForm;