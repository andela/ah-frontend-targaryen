import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import LandingPage from '../../components/landingPage/LandingPage';
import { Navbar } from '../../components/landingPage/Navbar';

it('renders the LandingPage component correctly', () => {
  const wrapper = shallow(<LandingPage />);
  expect(wrapper).toMatchSnapshot();
});

describe('Navbar component', () => {
  let wrapper;
  const mockStore = configureMockStore();
  const nextProps = {
    isLoginSuccess: true,
  };

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<Navbar />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not set isLoggedIn to true if login is unsuccessful', () => {
    wrapper.setProps({ isLoginSuccess: false });
    expect(wrapper.state('isLoggedIn')).toEqual(false);
  });

  it('should set isLoggedIn to true on successful login', () => {
    wrapper.setProps({ ...nextProps });
    expect(wrapper.state('isLoggedIn')).toEqual(true);
  });
});
