// step1 import configureStore and all the redux middleware we are using if any lines 1 and 2
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpense,
  startSetExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// step 2 create an array of all the middleware we are using

const middlewares = [thunk]; // add your middlewares like `redux-thunk`

// step 3 call the configureStore() with the array of middleware
// configureStore returns a function
const mockStore = configureStore(middlewares);
//Anytime i call mockstore function, it returns an instance of the configured mock store

// using the done arg, when done is as an arg to a test suite, the test suite waits for the done() to be called before it can complete its running, if the done() is never called the test fails
describe('the Expense Action Generators', () => {
  beforeEach(done => {
    const expenseData = {};
    expenses.forEach(({ id, description, note, createdAt, amount }) => {
      expenseData[id] = { description, note, createdAt, amount };
    });
    database
      .ref('expenses')
      .set(expenseData)
      .then(() => {
        // the done is called after the promise resolves and if the promise fails the test fails
        done();
      });
  });
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
  });
  test('should generate an add expense action', () => {
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenses[0]
    });
  });
  test('should add expense to the database and store', done => {
    // done is a method called when we want jest to wait before running a test, i.e we tell jest to wait for a while before finishing the test

    // declare an initial state value
    const initialState = {};
    // step 5 call an instance of mockStore to configure our store
    const store = mockStore(initialState);

    const expenseData = {
      description: 'Hand Bag',
      amount: 2400000,
      note: 'Givenchy Bag',
      createdAt: 1000
    };
    // step 6 dispatch all the actions
    // this dispatch is just like the one our component is doing
    // to assert stuffs about what it returns, we have to make sure the promise returns stuff in startAddExpense() in expense.js.
    // startAddExpense() returns a promise, so we can chain a then() and now assert inside the then
    store
      .dispatch(startAddExpense(expenseData))
      .then(() => {
        // since this then is an async function, without done(), jest runs the test suite without waiting for this to run but since we have done() as an arg, we call it here to force jest to wait for this async function to run before completing the test suite

        // to get the dispatched actions so we can make sure the store received it and also make sure what we sent to the db is sent as well
        const actions = store.getActions();
        console.log(actions, 'hi actions');
        // since it is only the internally generated dispatch that actually gets ent to the store, we will have only one action
        // store.getActions() returns an array
        expect(actions[0]).toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expenseData
          }
        });
        // making a db call to ensure the data got saved as it is supposed to and it will return a promise, so i can do promise chaining
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
  test('should add default expense to the database and store', done => {
    const initialState = {};
    const store = mockStore(initialState);
    const expenseDefault = {
      amount: 0,
      createdAt: 0,
      note: '',
      description: ''
    };
    store
      .dispatch(startAddExpense({}))
      .then(() => {
        const actions = store.getActions();
        console.log(actions, 'hi default actions');
        expect(actions[0]).toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expenseDefault
          }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done();
      });
  });

  test('should set the setExpense action generator with the right values', () => {
    const action = setExpense(expenses);
    expect(action).toEqual({
      type: 'SET_EXPENSE',
      expenses
    });
  });
  test('should fetch data from db and dispatch setExpenses', done => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(startSetExpense()).then(() => {
      const actions = store.getActions();
      console.log(actions, 'hi default actions');
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSE',
        expenses
      });
      done();
    });
  });
});
