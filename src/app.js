import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApiRoutes from './routers/ApiRoutes';
import store from './store/configureStore';
import storeActions from './store/actionStore';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';

storeActions();
const template = (
  <Provider store={store}>
    <ApiRoutes />
  </Provider>
);
const appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);
