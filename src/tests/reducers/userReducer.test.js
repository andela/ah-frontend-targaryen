import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_PROFILE_PAYLOAD,
  GET_PROFILE_ERROR,
  GET_PROFILE_INITIATED,
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
      isLoggedIn: false,
      loading: false,
      loginError: {},
      getProfilePayload: {},
      getProfileError: '',
      getProfileInitiated: false,
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
      getProfilePayload: {},
      getProfileError: '',
      getProfileInitiated: false,
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
      getProfilePayload: {},
      getProfileError: '',
      getProfileInitiated: false,
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
      getProfilePayload: {},
      getProfileError: '',
      getProfileInitiated: false,
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
      getProfilePayload: {},
      getProfileError: '',
      getProfileInitiated: false,
    });
  });

  it('should add profile when GET_PROFILE_PAYLOAD is passed', () => {
    const profileDetails = {
      username: 'user1', bio: 'My bio', avatar: 'avatar', following: ['user2'], followers: ['user2'],
    };
    const action = {
      type: GET_PROFILE_PAYLOAD,
      payload: profileDetails,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      registerUserSuccess: false,
      getProfilePayload: profileDetails,
      registerUserError: {},
      isLoginSuccess: false,
      isLoggedIn: false,
      loading: false,
      loginError: {},
      getProfileError: '',
      getProfileInitiated: false,
    });
  });

  it('should set getProfileInitiated to true when GET_PROFILE_INITIATED is passed', () => {
    const action = {
      type: GET_PROFILE_INITIATED,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      registerUserSuccess: false,
      registerUserError: {},
      isLoginSuccess: false,
      isLoggedIn: false,
      loading: false,
      loginError: {},
      getProfilePayload: {},
      getProfileError: '',
      getProfileInitiated: true,
    });
  });

  it('should add getProfileError when GET_PROFILE_ERROR is passed', () => {
    const profileError = 'The profile error';
    const action = {
      type: GET_PROFILE_ERROR,
      payload: profileError,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      registerUserSuccess: false,
      registerUserError: {},
      isLoginSuccess: false,
      isLoggedIn: false,
      loading: false,
      loginError: {},
      getProfilePayload: {},
      getProfileError: profileError,
      getProfileInitiated: false,
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
      getProfilePayload: {},
      getProfileError: '',
      getProfileInitiated: false,
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
      getProfilePayload: {},
      getProfileError: '',
      getProfileInitiated: false,
    });
  });
});
