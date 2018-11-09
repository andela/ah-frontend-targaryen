import React from 'react';
import { shallow } from 'enzyme';
import { GoogleTest } from '../../components/login/GoogleButton';

describe('Googlelogin Component', () => {
  let wrapper;
  const props = {
    isLoggedIn: true,
    googleLoginUser: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<GoogleTest {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should set redirect to true in the state when isLoggedIn prop is true', () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.state().redirect).toBe(true);
  });
  describe('signup method', () => {
    it('should call googleLoginUser when a token is passed', () => {
      wrapper.instance().signup('token');
      expect(props.googleLoginUser).toBeCalled();
    });
  });
  describe('handleGoogleResponse method', () => {
    it('should call signup when a response is passed', () => {
      const spy = jest.spyOn(wrapper.instance(), 'signup');
      const response = {
        tokenId: 'token',
      };
      wrapper.instance().handleGoogleResponse(response);
      expect(spy).toBeCalled();
    });
  });
});
