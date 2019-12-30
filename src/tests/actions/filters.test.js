import moment from 'moment';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters';

describe('the Filters Action Generators', () => {
  test('should generate a text filter action with default values', () => {
    const action = setTextFilter();
    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: ''
    })
  });
  test('should generate a text filter action with actual values', () => {
    const action = setTextFilter('Rent');
    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: 'Rent'
    })
  });
  test('should generate a sort by amount action', () => {
    expect(sortByAmount()).toEqual({
      type: 'SORT_AMOUNT'
    });
  });
  test('should generate a sort by date action', () => {
    expect(sortByDate()).toEqual({
      type: 'SORT_DATE'
    });
  });
  test('should generate a set start date action', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
      type: 'SET_START_DATE',
      startDate: moment(0)
    });
  });
  test('should generate a set end date action', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
      type: 'SET_END_DATE',
      endDate: moment(0)
    });
  });
});