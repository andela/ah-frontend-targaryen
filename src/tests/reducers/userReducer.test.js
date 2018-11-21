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
  UPDATE_PROFILE_INITIATED,
  UPDATE_PROFILE_SUCCESS,
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
      profileUpdateSuccessful: false,
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
      registerUserError: {},
      isLoggedIn: false,
      loading: false,
      loginError: {},
      profilePayload: {},
      profileUpdateSuccessful: false,
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
      isLoggedIn: false,
      loginError: {},
      loading: false,
      profilePayload: {},
      profileUpdateSuccessful: false,
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
      loginError: {},
      loading: false,
      profilePayload: {},
      profileUpdateSuccessful: false,
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
      loading: false,
      profilePayload: {},
      profileUpdateSuccessful: false,
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
      registerUserError: {},
      isLoggedIn: false,
      loading: false,
      loginError: {},
      profileUpdateSuccessful: false,
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
      loginError: {},
      profilePayload: {},
      profileUpdateSuccessful: false,
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
      loading: false,
      loginError: {},
      profilePayload: {},
      profileUpdateSuccessful: false,
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
      profilePayload: {},
      profileUpdateSuccessful: false,
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
      loginError: {},
      loading: false,
      profilePayload: {},
      profileUpdateSuccessful: false,
    });
  });
  it('should set loading to true when profile update is initiated', () => {
    const action = {
      type: UPDATE_PROFILE_INITIATED,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('should set profileUpdateSuccessful to true when profile update is successful', () => {
    const action = {
      type: UPDATE_PROFILE_SUCCESS,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      loading: false,
      profileUpdateSuccessful: true,
    });
  });
});
