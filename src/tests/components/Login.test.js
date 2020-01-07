import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../components/Login';

let startLogin, wrapper;
describe('To test the Login component with enzyme package', () => {
  beforeEach(() => {
    // called spies
    startLogin = jest.fn();
    wrapper = shallow(<Login startLogin={startLogin} />);
  });
  test('should render Login correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  // since the component has props so we test to match sure that the props were properly used
  test('should call login on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
  });
});
