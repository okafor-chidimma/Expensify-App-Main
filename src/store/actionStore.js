import store from './configureStore';
// import getVisibleExpenses from '../selectors/expenses';
import { addExpense, removeExpense, editExpense } from '../actions/expenses';
import { setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate } from '../actions/filters';

const storeActions = () => {
  // store.subscribe(() => {
  //   const state = store.getState();
  //   const visibleState = getVisibleExpenses(state.expenses, state.filters);
  //   console.log(state, 'i am the original state');
  //   console.log(visibleState, 'i am state');
  // });

  const expenseOne = store.dispatch(addExpense({ amount: 100, description: 'Rent Money', createdAt: 1000 }));
  const expenseTwo = store.dispatch(addExpense({ amount: 1500, description: 'Canvas Money', createdAt: -23000 }));
  const expenseThree = store.dispatch(addExpense({ amount: 2500, description: 'School fees', createdAt: 2000 }));
  const expenseFour = store.dispatch(addExpense({ amount: 3500, description: 'Water Bill', createdAt: 3000 }));
  const expenseFive = store.dispatch(addExpense({ amount: 4500, description: 'Gas Bill', createdAt: 500 }));
  
  // store.dispatch(removeExpense(expenseOne.expense));
  // store.dispatch(editExpense(expenseTwo.expense, { amount: 1000 }));
  // store.dispatch(setTextFilter('rent'));
  // store.dispatch(setTextFilter());
  // store.dispatch(setTextFilter('bill'));
  // store.dispatch(setTextFilter('water'));
  // store.dispatch(setTextFilter());
  // store.dispatch(sortByDate());
  // store.dispatch(sortByAmount());
  // store.dispatch(setStartDate(125));
  // store.dispatch(setStartDate());
  // store.dispatch(setEndDate(1250));

  return store;
};


export default storeActions;