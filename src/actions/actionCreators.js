import {
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
  GET_ALL_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  CREATE_ARTICLE_INITIATED,
  GET_COMMENT_INITIATED,
  ADD_COMMENT_SUCCESS,
  GET_COMMENTS_SUCCESS,
  LOGOUT_USER,
  GET_SPECIFIC_ARTICLE_SUCCESS,
  GET_USER_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_INITIATED,
  LIKE_DISLIKE_SUCCESS,
  LIKE_DISLIKE_ERROR,
  DELETE_ARTICLE_SUCCESS,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_ERROR,
  EDIT_ARTICLE_INITIATED,
  GET_SPECIFIC_ARTICLE_INITIATED,
  SEND_RESET_LINK_INITIATED,
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPDATE_COMMENT_INITIATED,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_ERROR,
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
export const getSpecificArticleInitiated = payload => ({
  type: GET_SPECIFIC_ARTICLE_INITIATED,
  payload,
});
export const getSpecificArticle = payload => ({
  type: GET_SPECIFIC_ARTICLE_SUCCESS,
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

export const addCommentSuccess = payload => ({
  type: ADD_COMMENT_SUCCESS,
  payload,
});

export const getCommentInititated = payload => ({
  type: GET_COMMENT_INITIATED,
  payload,
});

export const getCommentsSuccess = payload => ({
  type: GET_COMMENTS_SUCCESS,
  payload,
});
export const logoutUser = payload => ({
  type: LOGOUT_USER,
  payload,
});
export const getUserArticles = payload => ({
  type: GET_USER_ARTICLES_SUCCESS,
  payload,
});

export const getArticlesInitiated = payload => ({
  type: GET_ALL_ARTICLES_INITIATED,
  payload,
});
export const likeDislikeSuccess = payload => ({
  type: LIKE_DISLIKE_SUCCESS,
  payload,
});
export const likeDislikeError = payload => ({
  type: LIKE_DISLIKE_ERROR,
  payload,
});

export const deleteArticleSuccess = payload => ({
  type: DELETE_ARTICLE_SUCCESS,
  payload,
});
export const editArticleSuccess = payload => ({
  type: EDIT_ARTICLE_SUCCESS,
  payload,
});
export const editArticleError = payload => ({
  type: EDIT_ARTICLE_ERROR,
  payload,
});
export const editArticleInititated = payload => ({
  type: EDIT_ARTICLE_INITIATED,
  payload,
});

export const sendResetLinkInitiated = payload => ({
  type: SEND_RESET_LINK_INITIATED,
  payload,
});
export const sendResetLinkSuccess = payload => ({
  type: SEND_RESET_LINK_SUCCESS,
  payload,
});
export const sendResetLinkError = payload => ({
  type: SEND_RESET_LINK_ERROR,
  payload,
});
export const ResetPasswordSuccess = payload => ({
  type: RESET_PASSWORD_SUCCESS,
  payload,
});
export const ResetPasswordError = payload => ({
  type: RESET_PASSWORD_ERROR,
  payload,
});
export const updateCommentInitiated = payload => ({
  type: UPDATE_COMMENT_INITIATED,
  payload,
});
export const updateCommentSuccess = payload => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload,
});
export const updateCommentError = payload => ({
  type: UPDATE_COMMENT_ERROR,
  payload,
});
