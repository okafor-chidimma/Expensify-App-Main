import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper, match;
describe('should render the <EditExpensePage/>', () => {
  // declare the functions the component is expecting as props
  beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    match = { params: { id: expenses[0].id } };
    wrapper = shallow(
      <EditExpensePage
        history={history}
        startEditExpense={startEditExpense}
        startRemoveExpense={startRemoveExpense}
        expense={expenses[0]}
        match={match}
      />
    );
  });
  it('should render <EditExpensePage/> correctly with right props', () => {
    /*
      when you simulate an event, it is the same as the event occurring so that means that the call back function executes but when you just have a function that is not being triggered by an event, you create a mock of the function using jest and assert what you want to assert
    */
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(
      expenses[0].id,
      expenses[0]
    );
  });
  it('should handle removeExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
  });
});
