import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { ResetPasswordPage } from '../../components/resetPassword/ResetPasswordPage';
import { ForgotPasswordPage } from '../../components/resetPassword/ForgotPasswordPage';

let wrapper;
const mockStore = configureMockStore();

describe('ResetPasswordPage component', () => {
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
    mockStore({});
    wrapper = mount(
      <ResetPasswordPage
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

  it('should call handleSubmit on resetPassword form submission', () => {
    const spy = createSpy('handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('input').last().simulate('click', getEvent());
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

describe('ForgotPasswordPage component', () => {
  const createSpy = (toSpy) => jest.spyOn(wrapper.instance(), toSpy);

  const getEvent = (name = '', value = '') => ({
    preventDefault: jest.fn(),
    target: {
      name,
      value,
    },
  });

  beforeEach(() => {
    wrapper = mount(<ForgotPasswordPage dispatch={jest.fn} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
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
