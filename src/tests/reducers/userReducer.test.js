import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_PROFILE_PAYLOAD,
  LOGOUT_USER,
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
      isLoggedIn: false,
      registerUserError: {},
      loading: false,
      loginError: {},
      profilePayload: {},
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
      ...initialState,
      registerUserSuccess: true,
    });
  });

  it('should add an error when REGISTER_USER_ERROR is passed', () => {
    const action = {
      type: REGISTER_USER_ERROR,
      payload: errorData,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      registerUserError: errorData,
    });
  });

  it('should login a user when LOGIN_USER_SUCCESS is true', () => {
    const action = {
      type: LOGIN_USER_SUCCESS,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      isLoggedIn: true,
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
      ...initialState,
      loginError: loginErrorResponse,
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
      ...initialState,
      profilePayload: profileDetails,
    });
  });

  it('should set loading to true when GET_PROFILE_INITIATED is passed', () => {
    const action = {
      type: GET_PROFILE_INITIATED,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should set isLoggedIn to false when LOGOUT_USER is passed', () => {
    const action = {
      type: LOGOUT_USER,
      payload: false,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      isLoggedIn: false,
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
      ...initialState,
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
      ...initialState,
      isLoggedIn: true,
    });
  });
});
