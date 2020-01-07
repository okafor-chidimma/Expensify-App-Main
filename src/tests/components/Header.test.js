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
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
  });
});
