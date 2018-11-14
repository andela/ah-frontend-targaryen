import {
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
  GET_ALL_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  CREATE_ARTICLE_INITIATED,
} from './types';

export const socialLoginInitiated = () => ({
  type: SOCIAL_LOGIN_INITIATED,
});

export const socialLoginSuccess = () => ({
  type: SOCIAL_LOGIN_SUCCESS,
});

export const getAllArticles = payload => ({
  type: GET_ALL_ARTICLES_SUCCESS,
  payload,
});
export const createArticleSuccess = payload => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload,
});
export const createArticleError = payload => ({
  type: CREATE_ARTICLE_ERROR,
  payload,
});
export const createArticleInititated = payload => ({
  type: CREATE_ARTICLE_INITIATED,
  payload,
});
