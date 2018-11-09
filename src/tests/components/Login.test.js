import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Login } from '../../components/login/Login';


describe('Login component', () => {
  const mockStore = configureMockStore();
  let wrapper;
  const nextProps = {
    isLoginSuccess: true,
  };
  const props = {
    history: { push: jest.fn() },
    signIn: jest.fn(),
  };


  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<Login {...props} />);
  });


  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSubmit on form when submit button is clicked', () => {
    wrapper.find('#login-form').simulate('submit', { preventDefault() {} });
    expect(props.signIn).toBeCalled();
  });

  it('should set state when handleInput event is fired', () => {
    wrapper
      .find('#email')
      .simulate('change', {
        target: { name: 'email', value: 'toniks@gmail.com' },
      });
    expect(wrapper.state().email).toEqual('toniks@gmail.com');
  });

  it('should not redirect if isLoginSuccess is false', () => {
    wrapper.setProps({ isLoginSuccess: false });
    expect(props.history.push).toBeCalledTimes(0);
  });

  it('should redirect on successful login', () => {
    wrapper.setProps({ ...nextProps });
    expect(props.history.push).toBeCalledWith('/dashboard');
  });
});
