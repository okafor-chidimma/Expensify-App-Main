import React, { Component } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends Component {
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    note: this.props.expense ? this.props.expense.note : '',
    amount: this.props.expense
      ? (this.props.expense.amount / 100).toString()
      : '',
    createdAt: this.props.expense
      ? moment(this.props.expense.createdAt)
      : moment(),
    calendarFocused: false,
    error: ''
  };
  handleAddDescription = event => {
    const description = event.target.value;
    this.setState(() => ({
      description
    }));
  };
  handleAddNote = event => {
    const note = event.target.value;
    this.setState(() => ({
      note
    }));
  };
  handleAddAmount = event => {
    const amount = event.target.value;
    // this condition is for users to be able to clear their input
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    } else {
      console.log('invalid amount');
      this.setState(() => ({ error: 'Invalid Input For Amount' }));
    }
  };
  onDateChange = date => {
    if (date) {
      this.setState({
        createdAt: date
      });
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState({
      calendarFocused: focused
    });
  };
  onFormSubmit = event => {
    event.preventDefault();
    if (!this.state.description || !this.state.amount) {
      console.log('i should have error');
      this.setState(() => ({
        error: 'Please neither amount nor description can be empty'
      }));
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
  };
  render() {
    return (
      <form onSubmit={this.onFormSubmit} className='form'>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        <input
          type='text'
          name='description'
          className='text-input'
          placeholder='Description'
          autoFocus
          value={this.state.description}
          onChange={this.handleAddDescription}
        />
        <input
          type='text'
          className='text-input'
          placeholder='amount'
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
          className='textarea'
          placeholder='Enter a note for the expense'
          value={this.state.note}
          onChange={this.handleAddNote}
        ></textarea>
        <div>
          <button className='button'>
            {this.props.buttonState === 'edit' ? 'Edit Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;
