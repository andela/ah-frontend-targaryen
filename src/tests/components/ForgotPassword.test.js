import React from 'react';
import { mount } from 'enzyme';
import { ForgotPassword } from '../../components/resetPassword/ForgotPasswordPage';

let wrapper;

describe('ForgotPassword component', () => {
  const createSpy = (toSpy) => jest.spyOn(wrapper.instance(), toSpy);

  const getEvent = (name = '', value = '') => ({
    preventDefault: jest.fn(),
    target: {
      name,
      value,
    },
  });

  const props = {
    history: { push: jest.fn() },
    sendLinkInitiated: false,
    sendLinkSuccess: false,
  };

  const nextProps = {
    sendLinkSuccess: true,
  };

  const state = {
    username: '',
    email: '',
  };

  beforeEach(() => {
    wrapper = mount(<ForgotPassword dispatch={jest.fn} {...props} {...state} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should redirect on entering email details', () => {
    wrapper.setProps({ ...nextProps });
    expect(props.history.push).toBeCalledWith('/');
  });

  it('should call handleChange on form fill', () => {
    const spy = createSpy('handleChange');
    wrapper.instance().forceUpdate();
    wrapper.find('input[name="username"]').simulate('change', { target: { value: 'some value' } });
    expect(spy).toBeCalled();
  });

  it('should call handleSubmit on form submission', () => {
    const spy = createSpy('handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('input').last().simulate('click', getEvent());
    expect(spy).toBeCalled();
  });
});
