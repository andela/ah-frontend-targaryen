import axios from 'axios';
import { toast } from 'react-toastify';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_PROFILE_PAYLOAD,
  GET_PROFILE_ERROR,
  GET_PROFILE_INITIATED,
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './types';
import {
  socialLoginInitiated,
  socialLoginSuccess,
} from './actionCreators';
import axiosInstance from '../config/axiosInstance';


export const fetchUsers = (postData) => dispatch => {
  toast.dismiss();
  axiosInstance
    .post('/api/users/', postData)
    .then((response) => {
      localStorage.setItem('auth_token', response.data.user.auth_token);
      localStorage.setItem('username', response.data.user.username);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: true });
      toast.success('Signup successful', { autoClose: 3500, hideProgressBar: true });
    })
    .catch((error) => {
      let errorMessage = '';

      Object.keys(error.response.data.errors).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(error.response.data.errors, key)) {
          errorMessage += (`\n${key}: ${error.response.data.errors[key][0]}`);
        }
      });

      dispatch({ type: REGISTER_USER_ERROR, payload: errorMessage });
      toast.error(errorMessage, { autoClose: false, hideProgressBar: true });
    });
};

export const loginUser = payload => async dispatch => {
  toast.dismiss();
  axiosInstance
    .post('/api/users/login/', payload)
    .then(response => {
      localStorage.setItem('auth_token', response.data.user.auth_token);
      localStorage.setItem('username', response.data.user.username);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: true });
      toast.success(
        'Logged In!',
        { autoClose: 3500, hideProgressBar: true },
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    })
    .catch(error => {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: error.response.data.errors.error[0],
      });
      toast.error(
        `${error.response.data.errors.error}`,
        { autoClose: false },
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    });
};

export const googleLoginUser = (serviceProvider, userData) => (dispatch) => {
  dispatch(socialLoginInitiated(true));
  return axiosInstance.post(serviceProvider, userData)
    .then((res) => {
      localStorage.setItem('auth_token', res.data.user.access_token);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: true });
      toast.success('Login successful', { autoClose: 3500, hideProgressBar: true });
    })
    .catch(() => {
      toast.error('Connection error', { autoClose: 3500, hideProgressBar: true }, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
};

export const facebookLoginUser = (serviceProvider, userData) => (dispatch) => {
  dispatch(socialLoginInitiated(true));
  return axiosInstance.post(serviceProvider, userData)
    .then((res) => {
      localStorage.setItem('auth_token', res.data.user.access_token);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: true });
      toast.success('Login successful', { autoClose: 3500, hideProgressBar: true });
    })
    .catch(() => {
      toast.error('Connection error', { autoClose: 3500, hideProgressBar: true }, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
};
export const getProfile = () => dispatch => {
  dispatch({ type: GET_PROFILE_INITIATED, payload: true });
  const auth_token = localStorage.getItem('auth_token');
  const username = localStorage.getItem('username');

  axios.defaults.headers.common.Authorization = `Token ${auth_token}`;
  return axios
    .get(`https://ah-backend-targaryen-staging.herokuapp.com/api/profiles/${username}/`, auth_token)
    .then((response) => {
      dispatch({ type: GET_PROFILE_PAYLOAD, payload: response.data.profile });
    })
    .catch(() => {
      dispatch({ type: GET_PROFILE_ERROR, payload: 'This profile does not exist' });
    });
};

export const sendResetLink = (userDetails) => dispatch => axiosInstance
  .post('/api/users/password_reset/', userDetails)
  .then(response => {
    dispatch({ type: SEND_RESET_LINK_SUCCESS, payload: true });
    toast.dismiss();
    return toast.success(response.data.user.message, { autoClose: 3500, hideProgressBar: true });
  })
  .catch(() => {
    dispatch({ type: SEND_RESET_LINK_ERROR, payload: 'Please enter a valid email' });
    toast.dismiss();
    toast.error('Please enter a valid email', { autoClose: 3500, hideProgressBar: true });
  });


export const resetPassword = (passwordDetails) => dispatch => axiosInstance
  .put('/api/users/password_update/', passwordDetails)
  .then(response => {
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: true });
    toast.dismiss();
    toast.success(response.data.user.message, { autoClose: 3500, hideProgressBar: true });
  })
  .catch(() => {
    dispatch({ type: RESET_PASSWORD_ERROR, payload: 'Please enter a valid password' });
    toast.dismiss();
    toast.error('Please enter a valid password', { autoClose: 3500, hideProgressBar: true });
  });
