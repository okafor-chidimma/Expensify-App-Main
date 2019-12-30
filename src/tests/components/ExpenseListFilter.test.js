import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilter } from '../../components/ExpenseListFilter';
import { filters, altFilters } from '../fixtures/filters';

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper;
beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  wrapper = shallow(
    <ExpenseListFilter
      filters={filters}
      setEndDate={setEndDate}
      setStartDate={setStartDate}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
    />
  )
});

describe('Rendering <ExpenseListFilter />', () => {

  it('should render <ExpenseListFilter/> correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('should render <ExpenseListFilter/> with alt Filters correctly', () => {
    // to change the props of a given component before rendering it again
    wrapper.setProps({
      filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
  })
})
describe('Handling User Interactions', () => {
  it('should handle text changes', () => {
    const value = 'mon';
    wrapper.find('input').simulate('change', {
      target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
  });
  it('should sort by date', () => {
    wrapper.setProps({
      filters: altFilters
    })
    const value = 'date';
    wrapper.find('select').simulate('change', {
      target: { value }
    });
    expect(sortByDate).toHaveBeenCalled();
  });
  it('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
      target: { value }
    });
    expect(sortByAmount).toHaveBeenCalled();
  });
  it('should handle date changes', () => {
    const { startDate, endDate } = altFilters;
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);

  });
  it('should handle date focus changes', () => {
    const calendarFocused = "endDate";
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
  })
})