import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Login } from '../../components/login/Login';


describe('Login component', () => {
  const mockStore = configureMockStore();
  let wrapper;
  const nextProps = {
    isLoggedIn: true,
  };
  const props = {
    isLoggedIn: true,
    history: { push: jest.fn() },
    signIn: jest.fn(),
  };
  const redirectHome = jest.fn();

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<Login
      redirectHome={redirectHome}
      componentDidMount={jest.fn()}
      {...props}
    />);
  });

  afterEach(() => {
    wrapper.unmount();
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


  it('should redirect if isLoggedIn is true', () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(props.history.push).toBeCalled();
  });

  it('should redirect to dashboard when login is successful', () => {
    wrapper.setProps({ ...nextProps });
    expect(props.history.push).toBeCalledWith('/dashboard');
  });

  it('should call redirectHome when component mounts with isLoggedIn as true', () => {
    wrapper.setProps({ ...props });
    expect(props.history.push).toBeCalledWith('/dashboard');
  });
});
