import { shallow } from 'enzyme';
import React from 'react';
import Login from '../../components/Login';


it('renders the Login component correctly', () => {
  const wrapper = shallow(<Login />);
  expect(wrapper).toMatchSnapshot();
});
