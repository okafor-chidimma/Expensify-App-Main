import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApiRoutes, { history } from './routers/ApiRoutes';
import store from './store/configureStore';
import { startSetExpense } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
//ApiRoutes is a component that returns the routes

const template = (
  <Provider store={store}>
    <ApiRoutes />
  </Provider>
);
const appRoot = document.getElementById('app');
ReactDOM.render(<LoadingPage />, appRoot);

// there are two major ways to change the redux store,
/*
  by changing the redux store using npm package redux
  by changing the redux store using npm react-redux

  both methods are done using dispatch().i.e dispatching an action to redux store
*/
let hasRendered = false;
const renderApp = (template, appRoot) => {
  if (!hasRendered) {
    hasRendered = true;
    ReactDOM.render(template, appRoot);
  }
};

/*
  To track authentication

  Tracks a user's status from unauthenticated to authenticated if logged in and vice versa if logged out   
*/
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(`${user.uid} logged in`);
    store.dispatch(login(user.uid));
    store
      .dispatch(startSetExpense())
      .then(() => {
        renderApp(template, appRoot);
        if (history.location.pathname === '/') {
          history.push('/dashboard');
        }
      })
      .catch(error => {
        console.log(error, 'error loading expenses');
        const temp = <p>There was an error loading expenses</p>;
        renderApp(temp, appRoot);
      });
  } else {
    console.log('user logged out');
    store.dispatch(logout());
    history.push('/');
    renderApp(template, appRoot);
  }
});
