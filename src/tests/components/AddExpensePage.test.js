import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;
describe('should render the <AddExpensePage/>', () => {
  // declare the functions the component is expecting as props
  beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
      <AddExpensePage history={history} startAddExpense={startAddExpense} />
    );
  });
  it('should render <AddExpensePage/> correctly with right props', () => {
    /*
      when you simulate an event, it is the same as the event occurring so that means that the call back function executes but when you just have a function that is not being triggered by an event, you create a mock of the function using jest and assert what you want to assert
    */
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0]);
  });
});
