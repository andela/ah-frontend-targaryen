import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_INITIATED,
  CREATE_ARTICLE_ERROR,
  ADD_COMMENT_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENT_INITIATED,
  GET_ALL_ARTICLES_SUCCESS,
  GET_SPECIFIC_ARTICLE_SUCCESS,
  GET_USER_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_INITIATED,
  LIKE_DISLIKE_ERROR,
  LIKE_DISLIKE_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  articlesPayload: {},
  createArticleSuccess: false,
  createArticleError: {},
  addCommentSuccess: false,
  commentsPayload: {},
  userArticlesPayload: {},
  articlePayload: {},
  likeDislikeSuccess: false,
  likeDislikeError: {},
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLES_SUCCESS:
      return {
        ...state,
        articlesPayload: action.payload,
        loading: false,
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        createArticleSuccess: action.payload,
        loading: false,
      };
    case CREATE_ARTICLE_ERROR:
      return {
        ...state,
        createArticleError: action.payload,
        loading: false,
      };
    case CREATE_ARTICLE_INITIATED:
      return {
        ...state,
        loading: action.payload,
        createArticleSuccess: false,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentSuccess: action.payload,
      };
    case GET_COMMENT_INITIATED:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        commentsPayload: action.payload,
        loading: false,
      };
    case GET_SPECIFIC_ARTICLE_SUCCESS:
      return {
        ...state,
        articlePayload: action.payload,
      };
    case GET_USER_ARTICLES_SUCCESS:
      return {
        ...state,
        userArticlesPayload: action.payload,
      };
    case GET_ALL_ARTICLES_INITIATED:
      return {
        ...state,
        loading: action.payload,
      };
    case LIKE_DISLIKE_SUCCESS:
      return {
        ...state,
        likeDislikeSuccess: action.payload,
      };
    case LIKE_DISLIKE_ERROR:
      return {
        ...state,
        likeDislikeError: action.payload,
      };
    default:
      return state;
  }
};

export default articlesReducer;
