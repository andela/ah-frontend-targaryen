import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
  GET_PROFILE_PAYLOAD,
  GET_PROFILE_ERROR,
  GET_PROFILE_INITIATED,
} from '../actions/types';


const initialState = {
  registerUserSuccess: false,
  isLoginSuccess: false,
  registerUserError: {},
  loginError: {},
  isLoggedIn: false,
  loading: false,
  getProfilePayload: {},
  getProfileError: '',
  getProfileInitiated: false,
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
        isLoginSuccess: action.payload,
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
        getProfilePayload: action.payload,
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        getProfileError: action.payload,
      };
    case GET_PROFILE_INITIATED:
      return {
        ...state,
        getProfileInitiated: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
