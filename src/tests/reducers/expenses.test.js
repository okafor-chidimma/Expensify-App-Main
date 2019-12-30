import moment from 'moment';
import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';

describe('Testing the expense reducer', () => {
  test('should set the default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
  })
  test('should add an expense', () => {
    const expense = {
      id: '5',
      note: 'Testing add expense',
      description: 'add expense test',
      amount: 25000,
      createdAt: moment(0).add(7, 'days').valueOf()
    }
    const action = {
      type: 'ADD_EXPENSE',
      expense
    }
    const state = expensesReducer(expenses, action);
    expect(state[(state.length - 1)]).toEqual(expense);
    expect(state).toEqual([...expenses, expense]);
  })
  test('should edit an expense with id', () => {
    const updatedExpense = {
      note: 'Testing edit expense',
    }
    const action = {
      type: 'EDIT_EXPENSE',
      id: expenses[1].id,
      updatedExpense
    }
    const state = expensesReducer(expenses, action);
    expect(state[1].note).toBe('Testing edit expense');
  })
  test('should not edit an expense if id is not found', () => {
    const updatedExpense = {
      note: 'Testing edit expense',
    }
    const action = {
      type: 'EDIT_EXPENSE',
      id: '-1',
      updatedExpense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
  })
  test('should remove an expense with id', () => {
    const action = {
      type: 'REMOVE_EXPENSE',
      id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
  })
  test('should remove an expense if id is not found', () => {
    const action = {
      type: 'REMOVE_EXPENSE',
      id: '-1'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
  })
})