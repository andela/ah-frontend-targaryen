import { toast } from 'react-toastify';
import axiosInstance from '../config/axiosInstance';
import {
  getAllArticles,
  createArticleSuccess,
  createArticleError,
  createArticleInititated,
} from './actionCreators';

export const fetchArticles = () => dispatch => {
  axiosInstance.get('/api/article/').then(response => {
    dispatch(getAllArticles(response.data.article));
  });
};

export const postArticle = postData => dispatch => {
  toast.dismiss();
  dispatch(createArticleInititated(true));
  return axiosInstance
    .post('/api/articles/', postData)
    .then(response => {
      dispatch(createArticleSuccess(true));
      toast.success(
        response.statusText,
        { autoClose: 3500, hideProgressBar: true },
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    })
    .catch(() => {
      const errorMessage = 'Re-login and try again';
      dispatch(createArticleError(errorMessage));
      toast.error(errorMessage, { autoClose: false, hideProgressBar: true });
    });
};
