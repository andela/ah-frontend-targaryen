import React from 'react';
import { mount } from 'enzyme';
import { toast } from 'react-toastify';
import { ResetPassword } from '../../components/resetPassword/ResetPasswordPage';

let wrapper;

describe('ResetPassword component', () => {
  const createSpy = (toSpy) => jest.spyOn(wrapper.instance(), toSpy);
  const token = 'dosks';
  const params = { token };
  const match = { params };

  const getEvent = (name = '', value = '') => ({
    preventDefault: jest.fn(),
    target: {
      name,
      value,
    },
  });

  const props = {
    history: { push: jest.fn() },
  };

  const nextProps = {
    updatePasswordSuccess: true,
  };

  const state = {
    state: {
      password: {
        sendLinkSuccess: false,
        updatePasswordSuccess: false,
      },
    },
  };

  beforeEach(() => {
    wrapper = mount(
      <ResetPassword
        match={match}
        dispatch={jest.fn}
        sendLinkSuccess={state}
        {...props}
      />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChange on resetPassword form fill', () => {
    const spy = createSpy('handleChange');
    wrapper.instance().forceUpdate();
    wrapper.find('input[name="password1"]').simulate('change', { target: { value: 'some value' } });
    expect(spy).toBeCalled();
  });

  it('should reject the form submission if the second input is not the same as the first', () => {
    toast.error = jest.fn();
    wrapper.find('input[name="password1"]').simulate('change', getEvent('password1', 'different'));
    wrapper.find('input[name="password2"]').simulate('change', getEvent('password2', 'password'));
    wrapper.find('input[name="recover-submit"]').simulate('click', getEvent());
    expect(toast.error).toBeCalled();
  });

  it('should call handleSubmit on resetPassword form submission', () => {
    const spy = createSpy('handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('input[name="recover-submit"]').simulate('click', getEvent());
    expect(spy).toBeCalled();
  });

  it('should not redirect if invalid password is entered', () => {
    expect(props.history.push).toBeCalledTimes(0);
  });

  it('should redirect on successful update of password', () => {
    wrapper.setProps({ ...nextProps });
    expect(props.history.push).toBeCalledWith('/login');
  });
});
