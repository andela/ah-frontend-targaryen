import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Logout } from '../../components/login/Logout';


describe('Login component', () => {
  const mockStore = configureMockStore();
  let wrapper;
  const props = {
    history: { push: jest.fn() },
    logOut: jest.fn(),
    isLoggedIn: true,
  };


  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<Logout {...props} />);
  });

  it('should redirect user to login page', () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(props.history.push).toBeCalledTimes(1);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
