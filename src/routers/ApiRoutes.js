import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ExpenseDashBoardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
// import HelpExpensePage from '../components/HelpExpensePage';
import DoesNotExist from '../components/DoesNotExist';
import Login from '../components/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// to expose the history to other files for redirection
export const history = createBrowserHistory();
const ApiRoutes = () => (
  // browserRouter needs to have only one direct child, hence the div
  /*
    when we use browser router, react-router by default is creating browser history and is registering it with our new instances of Route and we can access
    it via props
    
    but we want access to the history of the app outside of the browser rouuter component or routes registered in the browser router, i.e we are using it 
    in the firebase Authentication in app.js, and we also want to keep our client side rendering(allowing the routing to be controlled by react-router-dom 
    instead of the server), we would have to do what BrowserRouter was doing automatically manually
    
    
    we can do this manually, by doing the following
    1. install history npm package so we can have access to push,location etc
    2. Import into your project
    3. create an instance of it called history
    4. change BrowserRouter Instance to Router and pass in the history props
    
  */
  // <BrowserRouter>
  //   <div>
  //     <Header />
  //     <Switch>
  //       <Route path='/' component={Login} exact={true} />
  //       <Route path='/dashboard' component={ExpenseDashBoardPage} />
  //       <Route path='/create' component={AddExpensePage} />
  //       <Route path='/edit/:id' component={EditExpensePage} />
  //       <Route path='/help' component={HelpExpensePage} />
  //       <Route component={DoesNotExist} />
  //     </Switch>
  //   </div>
  // </BrowserRouter>
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path='/' component={Login} exact={true} />
        <PrivateRoute path='/dashboard' component={ExpenseDashBoardPage} />
        <PrivateRoute path='/create' component={AddExpensePage} />
        <PrivateRoute path='/edit/:id' component={EditExpensePage} />
        {
           //  <Route path='/help' component={HelpExpensePage} />
        }
        <Route component={DoesNotExist} />
      </Switch>
    </div>
  </Router>
);

export default ApiRoutes;
