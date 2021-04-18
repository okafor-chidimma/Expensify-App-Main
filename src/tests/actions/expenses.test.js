// configureStore is a module that provides you with a fake representation of what your real redux store looks like after the redux store has passed through combine reducers
// step1 import configureStore and all the redux middleware we are using if any lines 1 and 2
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
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
const uid = 'abc123';
describe('the Expense Action Generators', () => {
  beforeEach(done => {
    const expenseData = {};
    expenses.forEach(({ id, description, note, createdAt, amount }) => {
      //expenseData.id ==> would have created an id property on expenseData object and assigned it the values on the right
      //expenseDat[id] ==> adds the value of id for instance '1234' as a property name to expenseData object
      //expenseData['1234'] = { description, note, createdAt, amount };
      expenseData[id] = { description, note, createdAt, amount };
    });
    database
      .ref(`users/${uid}/expenses`)
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
  test('should remove expense from database and store', done => {
    const initialState = { auth: { uid } };
    const store = mockStore(initialState);
    store
      .dispatch(startRemoveExpense(expenses[0].id))
      .then(() => {
        const actions = store.getActions();
        console.log(actions, 'hi default actions');
        expect(actions[0]).toEqual({
          type: 'REMOVE_EXPENSE',
          id: expenses[0].id
        });
        return database
          .ref(`users/${uid}/expenses/${expenses[0].id}`)
          .once('value');
      })
      .then(snapshot => {
        console.log(snapshot.val(), 'i am snap shot');

        expect(snapshot.val()).toBeFalsy();
        done();
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
  test('should update expense in database and redux', done => {
    const updatedExpense = {
      note: 'I am updating you from test'
    };
    const initialState = { auth: { uid } };
    const store = mockStore(initialState);
    store
      .dispatch(startEditExpense(expenses[0].id, updatedExpense))
      .then(() => {
        const actions = store.getActions();
        console.log(actions, 'hi default actions');
        expect(actions[0]).toEqual({
          type: 'EDIT_EXPENSE',
          id: expenses[0].id,
          updatedExpense
        });
        return database
          .ref(`users/${uid}/expenses/${expenses[0].id}`)
          .once('value');
      })
      .then(snapshot => {
        console.log(snapshot.val(), 'i am snap shot');
        expect(snapshot.val().note).toBe(updatedExpense.note);
        done();
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
    const initialState = { auth: { uid } };
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
    
    // startAddExpense() action generator returns a promise,how does it return a promise since we asked it to return a function?
    //the returned function is not for us, we do not have access to it rather it is called internally by redux, and when called the internal function starts executing.
    //it reaches the point in the internal function where we have explicitly told it to return a promise, so it returns the promise, but since the promise has been called
    //it must either resolve or reject. this means that the promise that is returned, at the point of the return is still pending but before our then block in this test file can
    //run, it must have resolved
    //in summary what startAddExpense() really returns is that promise in its pending state to allow us continue chaining and not the inner function
    //remember that the returned promised although pending must resolve later in the future even if we did not later use do any promise chaining.
    
    //RECAP
    //1. WHAT STARTADDEXPENSE() REALLY RETURNS THAT WE HAVE ACCESS TO IS A PROMISE IN ITS PENDING STATE.
    //2. WHY WE RETURNED THE PROMISE IS TO ALLOW US CONTINUE PROMISE CHAINING i.e ADDING OUR OWN THEN BLOCK TO THE RETURNED PROMISE
    //3. OUR THEN() ONLY RUNS AFTER THE RETURNED PROMISE HAS BEEN RESOLVED
    
    
    //so we can chain a then() and now assert inside the then
    store
      .dispatch(startAddExpense(expenseData))//returns our pending promise
      .then(() => {
      //before this then block can run, my pending promise must resolve and also run the then block it was returned with
      
        //why use done()?
        // since this then is an async function, without done(), jest runs the test suite without waiting for this to run but since we have done() as an arg, we call it here to force jest to wait for this async function to run before completing the test suite
        
      
        //why must we call store.getActions() and why must it be called from inside of the then() block as seen below?
        //A. to get the dispatched actions so we can make sure the store received it and also make sure what we sent to the db is sent as well
        
        //B i. the main purpose of the test is to ensure that the right action got sent(dispatched) to the store by redux
        //B ii. we can only get that action after the asynchronous request has finsihed running. if we had taken store.getAction() outside of this then(), it will run but the actions array
        //it will return may not have the latest or most recent actions in it because our async request may not have finished by that time. so the only to ensure that we get our actions after
        //our async req has finished, is by putting it in the then() success block
        
        
        const actions = store.getActions();
        console.log(actions, 'hi actions');
        // since it is only the internally generated dispatch that actually gets sent to the store, we will have only one action
        // store.getActions() returns an array
        expect(actions[0]).toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expenseData
          }
        });
        // making a db call to ensure the data got saved as it is supposed to and it will return a promise, so i can do promise chaining
        return database
          .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
          .once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
  test('should add default expense to the database and store', done => {
    const initialState = { auth: { uid } };
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
        return database
          .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
          .once('value');
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
    const initialState = { auth: { uid } };
    const store = mockStore(initialState);
    store.dispatch(startSetExpense()).then(() => {
      const actions = store.getActions();
      // console.log(actions, 'hi default actions');
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSE',
        expenses
      });
      done();
    });
  });
});
