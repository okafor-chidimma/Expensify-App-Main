import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

describe('Rendering <ExpenseForm/>', () => {
  it('should Render <ExpenseForm/> with empty input values', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render <ExpenseForm/> with expense values', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Testing User Interaction', () => {
  it('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    // to deal with events in components, we use the simulate method made available in jest
    // simulate('nameOfEvent',eventObject);
    // for e.g below, after submitting the form, the event handler is expecting an event object but because it is jest simulation, this event object is not just provided automatically, we have to pass it in as the second arg to the simulate method with all the properties the event handler will be needing.
    // in our case, it will be e.preventDefault(), so we define it as a property in the event object we passed as the second arg
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    // another jest method to track the state of a component is the state() which accepts the name of the property of the state object we want to assert or track
    // console.log(wrapper.state('error'), ',i am error from test');
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
  });
  it('should set description property of state on description change', () => {
    // create an instance of the object
    const wrapper = shallow(<ExpenseForm />);
    const value = 'Testing Jest description';
    // trigger the change event via simulation and pass in the event object with the right properties being used in the event handler, which is target and target is also an object that has value property that we are after
    // using at() since we have more than 1 input field
    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        target: { value }
      });
    expect(wrapper.state('description')).toBe(value);
  });
  it('should set note property of state on note change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'Testing Jest Test Note';
    wrapper.find('textarea').simulate('change', {
      target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
  });
  it('should set amount property of state on amount change with valid input', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = '12.55';
    wrapper
      .find('input')
      .at(1)
      .simulate('change', {
        target: { value }
      });
    expect(wrapper.state('amount')).toBe(value);
  });
  it('should render error on amount change with invalid input', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = '12.555';
    wrapper
      .find('input')
      .at(1)
      .simulate('change', {
        target: { value }
      });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();
  });
  it('should call onSubmit prop for valid form data', () => {
    // to create a mock function of our real function, we use line 72
    const onSubmitSpy = jest.fn();
    const { id, ...remExpense } = expenses[0];
    // console.log(remExpense);
    const wrapper = shallow(
      <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
    );
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith(remExpense);
  });
  it('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    const DateChangeSpy = wrapper.find('withStyles(SingleDatePicker)').props()
      .onDateChange;
    DateChangeSpy(now);
    expect(wrapper.state('createdAt')).toEqual(now);
    // wrapper.debug().find('SingleDatePicker').props();
    // console.log(wrapper.find('withStyles(SingleDatePicker)').props('onDateChange'));
    // console.log(wrapper.find('withStyles(SingleDatePicker)').props());
    // console.log(wrapper.state('createdAt'));
  });
  it('should set calendar focused on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({
      focused
    });
    // const CalendarFocusSpy = wrapper.find('withStyles(SingleDatePicker)').props().onFocusChange;
    // console.log(CalendarFocusSpy);
    // CalendarFocusSpy({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
  });
});
