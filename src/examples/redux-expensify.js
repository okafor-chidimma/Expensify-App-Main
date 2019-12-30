import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// demoState is going to contain a list of things that we want to track
const demoState = {
  expenses: [
    {
      id: 'hfdhhfddf',
      description: 'JAnuary rent',
      note: 'Last rent before moving',
      amount: 54500,
      createdAt: 0
    }
  ],
  filter: {
    text: 'hsggdsjsd',
    sortBy: 'amount', //amount or date
    startDate: undefined,
    endDate: undefined
  }
};

// ACTION GENERATORS

// Add expense
const addExpense = ({ amount = 0, createdAt = 0, note = '', description = '' } = {}) => (
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

const removeExpense = ({ id }) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  }
};

// Edit Expense

const editExpense = ({ id }, updatedExpense) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updatedExpense
  }
};

// Set Text Filter
const setTextFilter = (text = '') => {
  return {
    type: 'SET_TEXT_FILTER',
    text
  }
};

// Sort by amount filter
const sortByAmount = () => {
  return {
    type: 'SORT_AMOUNT'
  }
};

// Sort by date filter
const sortByDate = () => {
  return {
    type: 'SORT_DATE'
  }
};

// Set Start Date
const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate
});

// set end date
const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate
});

// to sort the expense and return data that matches
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    // this includes will always be true as long as the text is an empty string or a string contained in description
    // i.e textMatch will only be false is the text is not empty and cannot be found in description
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    console.log(textMatch, 'text match');

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  });

}


// the root properties of this state are expenses and filter, therefore, we need 2 reducers
// the reducer parameters: default value for state should be defined as shown below


// Expenses Reducer
const expenseStateDefault = [];
const expenseReducer = (state = expenseStateDefault, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);

    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updatedExpense
          }
        } else {
          return expense
        }
      });
    default:
      return state;
  }
};

// Filter Reducer
const filterStateDefault = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filterReducer = (state = filterStateDefault, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SORT_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
};
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleState = getVisibleExpenses(state.expenses, state.filters);
  console.log(state, 'i am the original state');

  console.log(visibleState, 'i am state');
});

const expenseOne = store.dispatch(addExpense({ amount: 100, description: 'Rent Money', createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ amount: 1500, description: 'Canvas Money', createdAt: -23000 }));
const expenseThree = store.dispatch(addExpense({ amount: 500, description: 'you', createdAt: -1000 }));
// console.log(expenseOne, 'hi');

// store.dispatch(removeExpense(expenseOne.expense));
// store.dispatch(editExpense(expenseTwo.expense, { amount: 1000 }));
store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());
// store.dispatch(setTextFilter('hhsdg'));
store.dispatch(sortByDate());
store.dispatch(sortByAmount());
// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
/*
  1: define the default properties for the state
  2: define the individual reducers
  3: register them by using combineReducers in createStore()
*/