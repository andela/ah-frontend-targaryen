import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../../actions/types';
import userReducer from '../../reducers/userReducer';

describe('userReducer', () => {
  let initialState;
  let errorData;
  let loginErrorResponse;
  const emailKey = 'Email: ';
  const usernameKey = 'Username: ';
  const passwordKey = 'Password: ';
  const emailValue = 'This field may not be blank.';
  const passwordValue = 'This field may not be blank.';
  const usernameValue = 'This field may not be blank.';

  beforeEach(() => {
    initialState = {
      registerUserSuccess: false,
      isLoginSuccess: false,
      registerUserError: {},
      loginError: {},
      isLoggedIn: false,
      loading: false,
    };
    errorData = `${emailKey + emailValue}\n${passwordKey + passwordValue}\n${usernameKey + usernameValue}`;
  });

  it('should run initial state', () => {
    expect(userReducer(initialState, {})).toEqual(initialState);
  });

  it('should add user when REGISTER_USER_SUCCESS is passed', () => {
    const action = {
      type: REGISTER_USER_SUCCESS,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      registerUserSuccess: true,
      registerUserError: {},
      isLoginSuccess: false,
      isLoggedIn: false,
      loading: false,
      loginError: {},
    });
  });

  it('should add an error when REGISTER_USER_ERROR is passed', () => {
    const action = {
      type: REGISTER_USER_ERROR,
      payload: errorData,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      registerUserSuccess: false,
      registerUserError: errorData,
      isLoginSuccess: false,
      loginError: {},
      isLoggedIn: false,
      loading: false,
    });
  });

  it('should login a user when LOGIN_USER_SUCCESS is true', () => {
    const action = {
      type: LOGIN_USER_SUCCESS,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      registerUserSuccess: false,
      registerUserError: {},
      isLoginSuccess: true,
      loginError: {},
      isLoggedIn: false,
      loading: false,
    });
  });

  it('should add an error when LOGIN_USER_ERROR is true', () => {
    loginErrorResponse = 'A user with this email and password was not found.';
    const action = {
      type: LOGIN_USER_ERROR,
      payload: loginErrorResponse,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      registerUserSuccess: false,
      registerUserError: {},
      isLoginSuccess: false,
      loginError: loginErrorResponse,
      isLoggedIn: false,
      loading: false,
    });
  });
  it('should start loading on sociallogin', () => {
    loginErrorResponse = 'A user with this email and password was not found.';
    const action = {
      type: SOCIAL_LOGIN_INITIATED,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      registerUserSuccess: false,
      registerUserError: {},
      isLoginSuccess: false,
      loginError: {},
      isLoggedIn: false,
      loading: true,
    });
  });
  it('should have logged in true', () => {
    loginErrorResponse = 'A user with this email and password was not found.';
    const action = {
      type: SOCIAL_LOGIN_SUCCESS,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      registerUserSuccess: false,
      registerUserError: {},
      isLoginSuccess: false,
      loginError: {},
      isLoggedIn: true,
      loading: false,
    });
  });


});
