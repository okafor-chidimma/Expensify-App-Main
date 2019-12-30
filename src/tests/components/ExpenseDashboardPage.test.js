import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDashBoardPage from '../../components/ExpenseDashboardPage';

describe('Rendering <ExpenseDashBoardPage/>', () => {
  it('Renders <ExpenseDashBoardPage/> correctly', () => {
    const wrapper = shallow(<ExpenseDashBoardPage/>);
    expect(wrapper).toMatchSnapshot();
  })
})