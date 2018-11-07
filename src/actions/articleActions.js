// import { GET_ALL_ARTICLES } from './types';
import axios from 'axios';
import axiosInstance from '../config/axiosInstance';
import { getAllArticles, createArticle } from './actionCreators';

// eslint-disable-next-line import/prefer-default-export
export const fetchArticles = () => dispatch => {
  axiosInstance
    .get('/api/article/')
    .then((response) => {
      dispatch(getAllArticles(response.data.article));
    });
};

export const writeArticle = (postData) => dispatch => {
  axios
    .post('http://127.0.0.1:8000/api/articles/',
      postData,
      {
        headers: {
          Authorizaton: `Token ${localStorage.getItem('auth_token')}`,
        },
      }).then(response => {
      console.log(response);
      dispatch(createArticle);
    }).catch(error => {
      console.log(error);
    });
};
