import {
  GET_ALL_ARTICLES_INITIATED,
  GET_ALL_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
} from './types';

export const getAllArticles = (payload) => ({
  type: GET_ALL_ARTICLES_SUCCESS,
  payload,
});

export const createArticle = (payload) => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload,
});
