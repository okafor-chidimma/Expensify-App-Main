import uuid from 'uuid';
// Add expense
export const addExpense = ({ amount = 0, createdAt = 0, note = '', description = '' } = {}) => (
  {
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      amount,
      createdAt,
      description,
      note
    }
  }
);

// remove expense

export const removeExpense = ({ id }) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  }
};

// Edit Expense

export const editExpense = ({ id }, updatedExpense) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updatedExpense
  }
};
