import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

describe('To test the Header component with react renderer package', () => {
  test('should render Header correctly', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Header />);
    // console.log(renderer.getRenderOutput());
    expect(renderer.getRenderOutput()).toMatchSnapshot(); 
  })
})