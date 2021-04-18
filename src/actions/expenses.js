import database from '../firebase/firebase';
// Add expense
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

// when the function is called, it returns a function which only works with the help of thunk middleware.
// Then the component dispatches this function to the redux store
// the redux store executes this function internally and every other thing inside the function
export const startAddExpense = (expense = {}) => {
  // this return function is internally ran by redux and it gets called with dispatch as an arg
  return (dispatch, getState) => {
    // getState() when called gets the current state of the redux store
    const uid = getState().auth.uid;
    const { amount = 0, createdAt = 0, note = '', description = '' } = expense;
    const expenseObj = { amount, description, createdAt, note };

    // to return a promise so we can continue the promise chain any place we call this function
    //use jest to test to make sure it does what it is meant to do
    return database
      .ref(`users/${uid}/expenses`)
      .push(expenseObj)
      .then(ref => {
        // the first dispatch from the component just makes this function available to redux store
        // it is this dispatch that changes the redux store
        dispatch(
          addExpense({
            id: ref.key,
            ...expenseObj
          })
        );
      })
      .catch(error => {
        console.log('could not insert into db', error);
      });
  };
};

// remove expense

export const removeExpense = ({ id }) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  };
};

export const startRemoveExpense = id => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        console.log('data removed successfully');
        dispatch(removeExpense({ id }));
      })
      .catch(error => {
        console.log('Problem deleting', error);
      });
  };
};

// Edit Expense

export const editExpense = ({ id }, updatedExpense) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updatedExpense
  };
};

export const startEditExpense = (id, updatedExpense) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updatedExpense)
      .then(() => {
        console.log('data updated successfully');
        dispatch(editExpense({ id }, updatedExpense));
      })
      .catch(error => {
        console.log('Problem updating', error);
      });
  };
};

// To Set Expense That is already in the db

// expenses here is an array
export const setExpense = expenses => ({
  type: 'SET_EXPENSE',
  expenses
});

export const startSetExpense = () => {
  // this return function is internally ran by redux and it gets called with dispatch as an arg
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // to return a promise so we can use jest to test to make sure it does what it is meant to do
    return database
      .ref(`users/${uid}/expenses`)
      .once('value')
      .then(snapshot => {
        const expenses = [];
        snapshot.forEach(childSnapshot => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpense(expenses));
      })
      .catch(error => {
        console.log('could not read from db', error);
      });
  };
};
