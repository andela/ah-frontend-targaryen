import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { RegisterUser } from '../../components/register/RegisterUser';

describe('RegisterUser component', () => {
  const nextProps = {
    registerUserSuccess: true,
  };

  const props = {
    history: { push: jest.fn() },
  };

  const mockStore = configureMockStore();
  let wrapper;
  const getUsers = jest.fn();
  const createSpy = (toSpy) => jest.spyOn(wrapper.instance(), toSpy);

  const getEvent = (name = '', value = '') => ({
    preventDefault: jest.fn(),
    target: {
      name,
      value,
    },
  });

  beforeEach(() => {
    mockStore({});
    wrapper = mount(<RegisterUser getUsers={getUsers} {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSubmit on form submission', () => {
    const spy = createSpy('handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit', getEvent());
    expect(spy).toBeCalled();
  });

  it('should call handleChange on form entry', () => {
    const spy = createSpy('handleChange');
    wrapper.instance().forceUpdate();
    wrapper.find('input[name="email"]').simulate('change', { target: { value: 'some value' } });
    expect(spy).toBeCalled();
  });

  describe('handleSubmit', () => {
    it('should call getUsers when called', () => {
      wrapper.find('#form').simulate('submit', { preventDefault() {} });
      expect(getUsers).toBeCalled();
    });
  });

  it('should pass user data form submission', () => {
    wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'user100@gmail.com' } });
    wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'Abc12345' } });
    wrapper.find('#username').simulate('change', { target: { name: 'username', value: 'user100' } });
    wrapper.find('#form').simulate('submit', { preventDefault() {} });
    expect(getUsers.mock.calls[2][0]).toEqual({ user: { email: 'user100@gmail.com', password: 'Abc12345', username: 'user100' } });
  });

  it('should not redirect if registerUserSuccess is false', () => {
    wrapper.setProps({ registerUserSuccess: false });
    expect(props.history.push).toBeCalledTimes(0);
  });

  it('should redirect on successful registration', () => {
    wrapper.setProps({ ...nextProps });
    expect(props.history.push).toBeCalledWith('/');
  });
});
