import React from 'react';
import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
import Header from '../../components/Header';
describe('To test the Header component with enzyme package', () => {
  test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Expensify');
    expect(wrapper).toMatchSnapshot();
    // expect(toJson(wrapper)).toMatchSnapshot();
    // console.log(wrapper.debug());
    // console.log(wrapper);
    // console.log(toJson(wrapper));
    // console.log(<Header />);

  })
})


