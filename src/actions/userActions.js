import { toast } from 'react-toastify';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from './types';
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