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
  getSpecificArticle,
  getUserArticles,
  getArticlesInitiated,
  likeDislikeSuccess,
  likeDislikeError,
  deleteArticleSuccess,
} from './actionCreators';

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

export const fetchArticles = () => dispatch => {
  dispatch(getArticlesInitiated(true));
  return axiosInstance
    .get('/api/article/')
    .then((response) => {
      dispatch(getAllArticles(response.data.article));
    });
};

export const fetchSpecificArticle = slug => dispatch => {
  axiosInstance
    .get(`/api/articles/${slug}/`)
    .then((response) => {
      dispatch(getSpecificArticle(response.data));
    });
};

export const fetchUserArticles = () => dispatch => {
  axiosInstance
    .get('/api/article/my-articles/')
    .then(response => {
      dispatch(getUserArticles(response.data.article));
    });
};

export const likeDislike = (payload, slug) => dispatch => {
  toast.dismiss();
  return axiosInstance
    .post(`/api/articles/${slug}/reaction/`, payload)
    .then(response => {
      dispatch(likeDislikeSuccess(true));
      toast.success(
        response.data.Message,
        { autoClose: 3500, hideProgressBar: true },
      );
    })
    .catch((error) => {
      if (error.response.data.detail === `You have already ${payload.reaction}d this article.`) {
        return axiosInstance
          .delete(`/api/articles/${slug}/reaction/`, { data: payload })
          .then(() => {
            dispatch(likeDislikeSuccess(true));
            toast.success(
              `You have removed your ${`${payload.reaction}`.toLocaleLowerCase()} from this article.`,
              { autoClose: 3500, hideProgressBar: true },
            );
          });
      }
      dispatch(likeDislikeError(error.response.data.detail));
      return toast.error(error.response.data.detail, { autoClose: false, hideProgressBar: true });
    });
};

export const deleteArticle = slug => dispatch => {
  axiosInstance
    .delete(`/api/articles/${slug}/`)
    .then(() => {
      dispatch(deleteArticleSuccess(true));
      toast.success(
        'The article was deleted!',
        { autoClose: 3500, hideProgressBar: true },
      );
    });
};
