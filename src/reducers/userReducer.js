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
  SEND_RESET_LINK_INITIATED,
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../actions/types';

const initialState = {
  registerUserSuccess: false,
  isLoggedIn: false,
  registerUserError: {},
  loginError: {},
  loading: false,
  profilePayload: {},
  resetPasswordloading: false,
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

    case SEND_RESET_LINK_INITIATED:
      return {
        ...state,
        resetPasswordloading: action.payload,
      };
    case SEND_RESET_LINK_SUCCESS:
      return {
        ...state,
        sendLinkSuccess: action.payload,
        resetPasswordloading: false,
      };
    case SEND_RESET_LINK_ERROR:
      return {
        ...state,
        sendLinkError: action.payload,
        resetPasswordloading: false,
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
