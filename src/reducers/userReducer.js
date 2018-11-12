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
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
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
  sendLinkSuccess: false,
  sendLinkError: {},
  resetPasswordSuccess: false,
  resetPasswordError: {},
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

    case SEND_RESET_LINK_SUCCESS:
      return {
        ...state,
        sendLinkSuccess: action.payload,
      };
    case SEND_RESET_LINK_ERROR:
      return {
        ...state,
        sendLinkError: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
