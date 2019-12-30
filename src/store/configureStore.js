import { createStore, combineReducers } from 'redux';
import expenseReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';

// demoState is going to contain a list of things that we want to track
const demoStore = {
  expenses: [
    {
      id: 'hfdhhfddf',
      description: 'January rent',
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
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const configureStore = () => {
  return store;
};
export default store;