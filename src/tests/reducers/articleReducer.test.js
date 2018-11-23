import articlesReducer from '../../reducers/articlesReducer';
import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  CREATE_ARTICLE_INITIATED,
  ADD_COMMENT_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENT_INITIATED,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_INITIATED,
  GET_SPECIFIC_ARTICLE_SUCCESS,
  GET_SPECIFIC_ARTICLE_INITIATED,
  GET_USER_ARTICLES_SUCCESS,
  LIKE_DISLIKE_SUCCESS,
  LIKE_DISLIKE_ERROR,
  DELETE_ARTICLE_SUCCESS,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_ERROR,
  EDIT_ARTICLE_INITIATED,
} from '../../actions/types';

describe('articlesReducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      articlesPayload: {},
      createArticleSuccess: false,
      createArticleError: {},
      loading: false,
      addCommentSuccess: false,
      commentsPayload: {},
      articlePayload: {},
      userArticlesPayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
      confirmDelete: false,
      editArticleSuccess: false,
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
      ...initialState,
      articlesPayload: action.payload,
    });
  });

  it('should set the loader when GET_ALL_ARTICLES_INITIATED is true', () => {
    const action = {
      type: GET_ALL_ARTICLES_INITIATED,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should set CREATE_ARTICLE_SUCCESS to true when an article is posted successfully', () => {
    const action = {
      type: CREATE_ARTICLE_SUCCESS,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      createArticleSuccess: true,
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
      ...initialState,
      createArticleError: postError,
    });
  });

  it('should set the loader when CREATE_ARTICLE_INITIATED is true', () => {
    const action = {
      type: CREATE_ARTICLE_INITIATED,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should set the loader when GET_COMMENT_INITIATED is true', () => {
    const action = {
      type: GET_COMMENT_INITIATED,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should set addCommentSuccess to true when ADD_COMMENT_SUCCESS is true', () => {
    const action = {
      type: ADD_COMMENT_SUCCESS,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      addCommentSuccess: true,
    });
  });

  it('should add a comment payload when GET_COMMENTS_SUCCESS is true', () => {
    const action = {
      type: GET_COMMENTS_SUCCESS,
      payload: [{ comment: 1 }],
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      commentsPayload: action.payload,
    });
  });

  it('should return a single article', () => {
    const action = {
      type: GET_SPECIFIC_ARTICLE_SUCCESS,
      payload: { body: 'sweet and simple' },
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      articlePayload: action.payload,
    });
  });

  it('should set the loader when GET_SPECIFIC_ARTICLE_INITIATED is true', () => {
    const action = {
      type: GET_SPECIFIC_ARTICLE_INITIATED,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should return a user's articles", () => {
    const action = {
      type: GET_USER_ARTICLES_SUCCESS,
      payload: { article: { article: { body: 'Nice' } } },
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      userArticlesPayload: action.payload,
    });
  });

  it('should change likeDislikeSuccess to true when a reaction is added or removed from an article', () => {
    const action = {
      type: LIKE_DISLIKE_SUCCESS,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      likeDislikeSuccess: true,
      likeDislikeError: {},
      editArticleSuccess: false,
    });
  });

  it('should add an error when a connection is not made to the server', () => {
    const connectionError = 'Unable to like article';
    const action = {
      type: LIKE_DISLIKE_ERROR,
      payload: connectionError,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      likeDislikeError: connectionError,
      editArticleSuccess: false,
    });
  });

  it('should update EDIT_ARTICLE_SUCCESS to true when an article is updated successfully', () => {
    const action = {
      type: EDIT_ARTICLE_SUCCESS,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      editArticleSuccess: true,
    });
  });

  it('should add an error when an article update is not successful', () => {
    const putError = 'Something went wrong';
    const action = {
      type: EDIT_ARTICLE_ERROR,
      payload: putError,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      editArticleError: putError,
    });
  });

  it('should set the loader when EDIT_ARTICLE_INITIATED is true', () => {
    const action = {
      type: EDIT_ARTICLE_INITIATED,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should set DELETE_ARTICLE_SUCCESS to true when article has been deleted', () => {
    const action = {
      type: DELETE_ARTICLE_SUCCESS,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      confirmDelete: true,
    });
  });
});
