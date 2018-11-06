import {
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
  GET_ALL_ARTICLES_SUCCESS,
} from './types';

export const socialLoginInitiated = () => ({
  type: SOCIAL_LOGIN_INITIATED,
});

export const socialLoginSuccess = () => ({
  type: SOCIAL_LOGIN_SUCCESS,
});

export const getAllArticles = (payload) => ({
  type: GET_ALL_ARTICLES_SUCCESS,
  payload,
});
