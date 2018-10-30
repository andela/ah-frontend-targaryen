import { toast } from 'react-toastify';
import { REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from './types';
import axiosInstance from '../config/axiosInstance';

export const fetchUsers = (postData) => dispatch => {
  axiosInstance
    .post('/api/users/', postData)
    .then((response) => {
      localStorage.setItem('auth_token', response.data.user.auth_token);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: true });
      toast.dismiss();
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
      toast.dismiss();
      toast.error(errorMessage, { autoClose: false, hideProgressBar: true });
    });
};

export default fetchUsers;
