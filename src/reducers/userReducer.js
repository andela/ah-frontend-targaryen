import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
} from '../actions/types';


const initialState = {
  registerUserSuccess: false,
  isLoginSuccess: false,
  registerUserError: {},
  loginError: {},
  isLoggedIn: false,
  loading: false,
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

    default:
      return state;
  }
};

export default userReducer;
