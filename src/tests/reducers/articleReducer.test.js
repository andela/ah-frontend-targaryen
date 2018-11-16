import articlesReducer from '../../reducers/articlesReducer';
import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  CREATE_ARTICLE_INITIATED,
  ADD_COMMENT_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENT_INITIATED,
  GET_ALL_ARTICLES_SUCCESS,
  GET_SPECIFIC_ARTICLE_SUCCESS,
  GET_USER_ARTICLES_SUCCESS,
  LIKE_DISLIKE_SUCCESS,
  LIKE_DISLIKE_ERROR,
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
      articlePayload: {},
      createArticleSuccess: false,
      createArticleError: {},
      loading: false,
      addCommentSuccess: false,
      commentsPayload: {},
      userArticlesPayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
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
      createArticleError: {},
      loading: false,
      addCommentSuccess: false,
      commentsPayload: {},
      userArticlesPayload: {},
      articlePayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
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
      addCommentSuccess: false,
      commentsPayload: {},
      userArticlesPayload: {},
      articlePayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
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
      createArticleError: {},
      loading: true,
      addCommentSuccess: false,
      commentsPayload: {},
      userArticlesPayload: {},
      articlePayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
    });
  });

  it('should set the loader when GET_COMMENT_INITIATED is true', () => {
    const action = {
      type: GET_COMMENT_INITIATED,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlesPayload: {},
      createArticleSuccess: false,
      createArticleError: {},
      loading: true,
      addCommentSuccess: false,
      commentsPayload: {},
      userArticlesPayload: {},
      articlePayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
    });
  });

  it('should set addCommentSuccess to true when ADD_COMMENT_SUCCESS is true', () => {
    const action = {
      type: ADD_COMMENT_SUCCESS,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlesPayload: {},
      createArticleSuccess: false,
      createArticleError: {},
      loading: false,
      addCommentSuccess: true,
      commentsPayload: {},
      userArticlesPayload: {},
      articlePayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
    });
  });

  it('should add a comment payload when GET_COMMENTS_SUCCESS is true', () => {
    const action = {
      type: GET_COMMENTS_SUCCESS,
      payload: [{ comment: 1 }],
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlesPayload: {},
      createArticleSuccess: false,
      createArticleError: {},
      loading: false,
      addCommentSuccess: false,
      commentsPayload: action.payload,
      userArticlesPayload: {},
      articlePayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
    });
  });

  it('should return a single article', () => {
    const action = {
      type: GET_SPECIFIC_ARTICLE_SUCCESS,
      payload: { body: 'sweet and simple' },
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlePayload: action.payload,
      articlesPayload: {},
      userArticlesPayload: {},
      createArticleSuccess: false,
      loading: false,
      addCommentSuccess: false,
      commentsPayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
      createArticleError: {},
    });
  });

  it("should return a user's articles", () => {
    const action = {
      type: GET_USER_ARTICLES_SUCCESS,
      payload: { article: { article: { body: 'Nice' } } },
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      createArticleError: {},
      articlePayload: {},
      articlesPayload: {},
      userArticlesPayload: action.payload,
      createArticleSuccess: false,
      loading: false,
      addCommentSuccess: false,
      commentsPayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: {},
    });
  });

  it('should change likeDislikeSuccess to true when a reaction is added or removed from an', () => {
    const action = {
      type: LIKE_DISLIKE_SUCCESS,
      payload: true,
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlePayload: {},
      userArticlesPayload: {},
      articlesPayload: {},
      createArticleSuccess: false,
      createArticleError: {},
      loading: false,
      addCommentSuccess: false,
      commentsPayload: {},
      likeDislikeSuccess: true,
      likeDislikeError: {},
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
      userArticlesPayload: {},
      articlePayload: {},
      articlesPayload: {},
      createArticleSuccess: false,
      createArticleError: {},
      loading: false,
      addCommentSuccess: false,
      commentsPayload: {},
      likeDislikeSuccess: false,
      likeDislikeError: connectionError,
    });
  });
});
