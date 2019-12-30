import { createStore } from 'redux';



const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});
const setCount = ({ count }) => ({
  type: 'SET',
  count
});
const resetCount = () => ({
  type: 'RESET'
});

// Reducers

const countReducer = (state = { count: 0 }, action) => {
  // the default object is called the state
  // the object returned is the new state
  // it is advisable not to alter the default state but to return a new one
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;

  }
};
// countReducer is a call back function. so it will only be referenced and not called
const store = createStore(countReducer);

console.log(store);
console.log(store.getState(), 'no dispatch');
store.subscribe(() => {
  console.log(store.getState(), 'dispatch 3');
});

// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState(), 'dispatch 3');
// });

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
// store.dispatch({
//   type: "INCREMENT"
// });
// unsubscribe();
// console.log(store.getState(), 'dispatch 1');

// store.dispatch({
//   type: "DECREMENT",
//   decrementBy: 64
// });
// store.dispatch({
//   type: "DECREMENT"
// });
// console.log(store.getState(), 'dispatch 2');

store.dispatch(decrementCount({ decrementBy: 64 }));
store.dispatch(decrementCount());

// store.dispatch({
//   type: "RESET"
// });
// store.dispatch({
//   type: "SET",
//   count: 500
// });

store.dispatch(setCount({ count: 500 }));
store.dispatch(resetCount());


