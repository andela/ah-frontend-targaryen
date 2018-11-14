import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
  GET_PROFILE_PAYLOAD,
  GET_PROFILE_INITIATED,
  LOGOUT_USER,
} from '../actions/types';

const initialState = {
  registerUserSuccess: false,
  isLoggedIn: false,
  registerUserError: {},
  loginError: {},
  loading: false,
  profilePayload: {},
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUserSuccess: action.payload,
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        registerUserError: action.payload,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case LOGIN_USER_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };
    case SOCIAL_LOGIN_INITIATED:
      return {
        ...state,
        loading: true,
      };
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
      };

    case GET_PROFILE_PAYLOAD:
      return {
        ...state,
        profilePayload: action.payload,
        loading: false,
      };
    case GET_PROFILE_INITIATED:
      return {
        ...state,
        loading: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
