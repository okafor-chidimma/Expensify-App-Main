import React from 'react';
import { shallow } from 'enzyme';
import DoesNotExist from '../../components/DoesNotExist';

describe('Rendering <DoesNotExist/>', () => {
  it('Renders <DoesNotExist/> correctly', () => {
    const wrapper = shallow(<DoesNotExist />);
    expect(wrapper).toMatchSnapshot();
  })
})