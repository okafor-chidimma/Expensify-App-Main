import moment from 'moment';
import filtersReducer from '../../reducers/filters';

describe('Testing the filters reducer', () => {
  test('should test with the default state values', () => {
    const result = filtersReducer(undefined, { type: "@@INIT" });
    expect(result).toEqual({
      text: '',
      sortBy: 'date',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    })
  });
  test('should sort by amount', () => {
    const result = filtersReducer(undefined, { type: "SORT_AMOUNT" });
    expect(result.sortBy).toBe('amount');
  })
  test('should sort by date', () => {
    const currentState = {
      text: '',
      sortBy: 'amount',
      startDate: undefined,
      endDate: undefined
    }
    const result = filtersReducer(undefined, { type: "SORT_DATE" });
    expect(result.sortBy).toBe('date');
  })
  test('should set text filter', () => {
    const currentFilter = {
      text: 'M',
      type:'SET_TEXT_FILTER'
    }
    const result = filtersReducer(undefined, currentFilter);
    expect(result.text).toBe('M');
  })
  test('should set start date filter', () => {
    const currentFilter = {
      startDate: moment(0),
      type: 'SET_START_DATE'
    }
    const result = filtersReducer(undefined, currentFilter);
    expect(result.startDate).toEqual(moment(0));
  })
  test('should set end date filter', () => {
    const currentFilter = {
      endDate: moment(0),
      type: 'SET_END_DATE'
    }
    const result = filtersReducer(undefined, currentFilter);
    expect(result.endDate).toEqual(moment(0));
  })

});