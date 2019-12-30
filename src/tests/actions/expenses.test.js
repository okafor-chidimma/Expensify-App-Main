import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

describe('the Expense Action Generators', () => {
  test('should generate a remove expense action', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '123abc'
    });
  });
  test('should generate an edit expense action', () => {
    const action = editExpense({ id: '123abc' }, { note: 'i am test note' });
    expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id: '123abc',
      updatedExpense: { note: 'i am test note' }
    });
  })
  test('should generate an add expense action', () => {
    const expenseDetails = {
      amount: 100,
      description: 'Rent Money',
      createdAt: 1000,
      note: 'My rent for last month'
    }
    const action = addExpense(expenseDetails);
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        ...expenseDetails,
        id: expect.any(String)
      }
    })
  })
  test('should generate an add expense action with default values', () => {
    const expenseDetails = {
      amount: 0,
      description: '',
      createdAt: 0,
      note: ''
    }
    const action = addExpense();
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        ...expenseDetails,
        id: expect.any(String)
      }
    })
  })
});
