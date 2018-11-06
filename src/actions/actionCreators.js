import {
  GET_ALL_ARTICLES_INITIATED,
  GET_ALL_ARTICLES_SUCCESS,
} from './types';

const getAllArticles = (payload) => ({
  type: GET_ALL_ARTICLES_SUCCESS,
  payload,
});

export default getAllArticles;
