import { shallow } from 'enzyme';
import React from 'react';
import LandingPage from '../../components/LandingPage';


it('renders the LandingPage component correctly', () => {
  const wrapper = shallow(<LandingPage />);
  expect(wrapper).toMatchSnapshot();
});
