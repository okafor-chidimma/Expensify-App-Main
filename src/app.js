import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApiRoutes from './routers/ApiRoutes';
import store from './store/configureStore';
import { startSetExpense } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const template = (
  <Provider store={store}>
    <ApiRoutes />
  </Provider>
);
const appRoot = document.getElementById('app');
ReactDOM.render(<p>Loading...</p>, appRoot);

store
  .dispatch(startSetExpense())
  .then(() => {
    ReactDOM.render(template, appRoot);
  })
  .catch(error => {
    console.log(error, 'error loading expenses');
    ReactDOM.render(<p>There was an error loading expenses</p>, appRoot);
  });
