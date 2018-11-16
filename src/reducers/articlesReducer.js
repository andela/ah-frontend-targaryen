import {
  GET_ALL_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_INITIATED,
  CREATE_ARTICLE_ERROR,
  ADD_COMMENT_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENT_INITIATED,
} from '../actions/types';

const initialState = {
  loading: false,
  articlesPayload: {},
  createArticleSuccess: false,
  createArticleError: {},
  addCommentSuccess: false,
  commentsPayload: {},
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLES_SUCCESS:
      return {
        ...state,
        articlesPayload: action.payload,
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
    default:
      return state;
  }
};

export default articlesReducer;
