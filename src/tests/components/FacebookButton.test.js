import React from 'react';
import { shallow } from 'enzyme';
import { FacebookTest } from '../../components/login/FacebookButton';

describe('facebooklogin component', () => {
  let wrapper;
  const props = {
    isLoggedIn: true,
    facebookLoginUser: jest.fn(),
  };
  beforeEach(() => {
    wrapper = shallow(<FacebookTest {...props} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should set reditect to true when isLoggedIn is true', () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.state().redirect).toBe(true);
  });
  describe('signup method', () => {
    it('should call facebook login when a token is passed', () => {
      wrapper.instance().signup('token');
      expect(props.facebookLoginUser).toHaveBeenCalled();
    });
  });
  describe('handleFacebookResponse', () => {
    it('should call signup method when a response is passed', () => {
      const spy = jest.spyOn(wrapper.instance(), 'signup');
      const response = {
        tokenId: 'token',
      };
      wrapper.instance().handleFacebookResponse(response);
      expect(spy).toBeCalled();
    });
  });
});
