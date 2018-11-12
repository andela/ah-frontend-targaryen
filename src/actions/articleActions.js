import { toast } from 'react-toastify';
import axiosInstance from '../config/axiosInstance';
import {
  getAllArticles,
  createArticleSuccess,
  createArticleError,
  createArticleInititated,
  addCommentSuccess,
  getCommentInititated,
  getCommentsSuccess,
  logoutUser,
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

export const addComment = (postData, article) => dispatch => {
  axiosInstance
    .post(`/api/articles/${article}/comments/`, postData)
    .then(() => {
      dispatch(addCommentSuccess(true));
    });
};

export const fetchComments = article => dispatch => {
  dispatch(getCommentInititated(true));
  axiosInstance
    .get(`/api/articles/${article}/comments/`)
    .then((response) => {
      dispatch(getCommentsSuccess(response.data));
    })
    .catch(() => {
      localStorage.removeItem('auth_token');
      dispatch(logoutUser(false));
      toast.error('Please login to view comments', { autoClose: false, hideProgressBar: true });
    });
};
