import React from 'react';
import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
import { Header } from '../../components/Header';

let startLogout, wrapper;
describe('To test the Header component with enzyme package', () => {
  beforeEach(() => {
    startLogout = jest.fn();
    wrapper = shallow(<Header startLogout={startLogout} />);
  });
  test('should render Header correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should call logout on button click', () => {
    //once we simulate the click event, the call back function is triggered
    //the goal is to test that the startLogout call back method ran when the logout button was clicked
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
  });
});
