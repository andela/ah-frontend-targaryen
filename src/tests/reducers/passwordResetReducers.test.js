import {
  SEND_RESET_LINK_INITIATED,
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../../actions/types';
import userReducer from '../../reducers/userReducer';

describe('passwordResetReducers', () => {
  let initialState;
  let errorData;
  let resetPasswordErrorResponse;

  beforeEach(() => {
    initialState = {
      sendLinkSuccess: false,
      resetPasswordloading: false,
      loading: false,
      resetPasswordSuccess: false,
      sendLinkError: {},
      resetPasswordError: {},
    };
  });

  it('should run initial state', () => {
    expect(userReducer(initialState, {})).toEqual(initialState);
  });

  it('should begin the loader when SEND_RESET_LINK_INITIATED is changed to true', () => {
    const action = {
      type: SEND_RESET_LINK_INITIATED,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      loading: false,
      sendLinkSuccess: false,
      sendLinkError: {},
      resetPasswordloading: true,
      resetPasswordSuccess: false,
      resetPasswordError: {},
    });
  });

  it('should notify a user when SEND_RESET_LINK_SUCCESS is passed', () => {
    const action = {
      type: SEND_RESET_LINK_SUCCESS,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      sendLinkSuccess: true,
    });
  });

  it('should add an error when SEND_RESET_LINK_ERROR is passed', () => {
    errorData = 'Please enter a valid email';
    const action = {
      type: SEND_RESET_LINK_ERROR,
      payload: errorData,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      sendLinkError: errorData,
    });
  });

  it('should update a password of a user when RESET_PASSWORD_SUCCESS is true', () => {
    const action = {
      type: RESET_PASSWORD_SUCCESS,
      payload: true,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      resetPasswordSuccess: true,
    });
  });

  it('should add an error when RESET_PASSWORD_ERROR is true', () => {
    resetPasswordErrorResponse = 'Password must be at least 8 characters';
    const action = {
      type: RESET_PASSWORD_ERROR,
      payload: resetPasswordErrorResponse,
    };
    const currentState = userReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      resetPasswordError: resetPasswordErrorResponse,
    });
  });
});
