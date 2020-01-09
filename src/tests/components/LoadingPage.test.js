import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../components/LoadingPage';

describe('Rendering <LoadingPage/> correctly', () => {
  it('should render <LoadingPage/> correctly', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
