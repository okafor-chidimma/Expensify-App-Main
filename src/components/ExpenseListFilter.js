import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from '../actions/filters';

export class ExpenseListFilter extends Component {
  state = {
    calendarFocused: null
  };
  onDateChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };
  onInputChange = event => {
    this.props.setTextFilter(event.target.value);
  };
  onSelectChange = event => {
    console.log(event.target.value, 'hi value');
    event.target.value === 'date'
      ? this.props.sortByDate()
      : this.props.sortByAmount();
  };
  render() {
    return (
      <div className='content-container'>
        <div className='input-group'>
          <div className='input-group__item'>
            <input
              type='text'
              className='text-input'
              value={this.props.filters.text}
              onChange={this.onInputChange}
              placeholder="Search Expenses"
            />
          </div>
          <div className='input-group__item'>
            <select
              name='sortBy'
              className='select'
              value={this.props.filters.sortBy}
              onChange={this.onSelectChange}
            >
              <option value='date'>Date</option>
              <option value='amount'>Amount</option>
            </select>
          </div>
          <div className='input-group__item'>
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId='MyStartDatePicker'
              endDateId='MyEndDatePicker'
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDateChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
              showClearDates={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
// PS you can always implicitly return the object i.e without the return keyword
const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    setEndDate: endDate => dispatch(setEndDate(endDate)),
    setTextFilter: value => dispatch(setTextFilter(value)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);
