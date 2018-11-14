import {
  GET_ALL_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_INITIATED,
  CREATE_ARTICLE_ERROR,
} from '../actions/types';

const initialState = {
  loading: false,
  articlesPayload: {},
  createArticleSuccess: false,
  createArticleError: {},
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
    default:
      return state;
  }
};

export default articlesReducer;
