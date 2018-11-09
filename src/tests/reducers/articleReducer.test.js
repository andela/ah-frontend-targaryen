import articlesReducer from '../../reducers/articlesReducer';
import {
  GET_ALL_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  CREATE_ARTICLE_INITIATED,
} from '../../actions/types';

describe('articlesReducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      articlesPayload: {},
      createArticleSuccess: false,
      loading: false,
    };
  });

  it('should run initial state', () => {
    expect(articlesReducer(initialState, {})).toEqual(initialState);
  });

  it('should return all articles', () => {
    const action = {
      type: GET_ALL_ARTICLES_SUCCESS,
      payload: [{ author: 1 }],
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlesPayload: action.payload,
      createArticleSuccess: false,
      loading: false,
    });
  });

  it('should add CREATE_ARTICLE_SUCCESS to true when an article is posted successfully', () => {
    const action = {
      type: CREATE_ARTICLE_SUCCESS,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlesPayload: {},
      createArticleSuccess: true,
      loading: false,
    });
  });

  it('should add an error when an article is not successfully posted', () => {
    const postError = 'Re-login and try again';
    const action = {
      type: CREATE_ARTICLE_ERROR,
      payload: postError,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlesPayload: {},
      createArticleSuccess: false,
      createArticleError: postError,
      loading: false,
    });
  });

  it('should set the loader when CREATE_ARTICLE_INITIATED is true', () => {
    const action = {
      type: CREATE_ARTICLE_INITIATED,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlesPayload: {},
      createArticleSuccess: false,
      loading: true,
    });
  });
});
