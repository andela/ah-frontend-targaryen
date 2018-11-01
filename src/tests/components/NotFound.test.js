import { shallow } from 'enzyme';
import React from 'react';
import NotFound from '../../components/notFound/NotFound';

it('renders the NotFound component correctly', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});
