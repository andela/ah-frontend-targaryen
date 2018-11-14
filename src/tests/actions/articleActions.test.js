import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axiosInstance from '../../config/axiosInstance';
import {
  fetchArticles,
  postArticle,
  fetchComments,
  addComment,
  fetchSpecificArticle,
  fetchUserArticles,
  likeDislike,
} from '../../actions/articleActions';
import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_INITIATED,
  CREATE_ARTICLE_ERROR,
  GET_COMMENT_INITIATED,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  LOGOUT_USER,
  GET_ALL_ARTICLES_SUCCESS,
  GET_SPECIFIC_ARTICLE_SUCCESS,
  GET_USER_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_INITIATED,
  LIKE_DISLIKE_SUCCESS,
  LIKE_DISLIKE_ERROR,
} from '../../actions/types';

let store;
let mock;
const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

describe('articleActions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('should return all articles', async () => {
    const response_data = {
      article: {
        count: 5,
        results: [
          { author: 10, title: 'React Redux' },
        ],
      },
    };

    mock.onGet('/api/article/')
      .reply(200, response_data);
    fetchArticles()(store.dispatch);

    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: GET_ALL_ARTICLES_INITIATED, payload: true },
        { type: GET_ALL_ARTICLES_SUCCESS, payload: response_data.article },
      ],
    );
  });

  it('should return a specific article', async () => {
    const res_data = {
      article: {
        author: { bio: 'Nice' },
        body: 'Plain and simple',
      },
    };
    const slug = 'an-article';
    mock.onGet(`api/articles/${slug}`)
      .reply(200, res_data);
    fetchSpecificArticle(slug)(store.dispatch);

    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: GET_ALL_ARTICLES_INITIATED, payload: true },
        { type: GET_SPECIFIC_ARTICLE_SUCCESS, payload: res_data },
      ],
    );
  });

  it('should not post an article if not logged in or token is expired', async () => {
    localStorage.removeItem('auth_token');
    mock.onPost('/api/articles/').reply(403);
    postArticle()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [{ type: CREATE_ARTICLE_INITIATED, payload: true },
        { type: CREATE_ARTICLE_ERROR, payload: 'Re-login and try again' },
      ],
    );
  });

  it('should post an article', async () => {
    mock.onPost('/api/articles/').reply(201);
    postArticle()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: CREATE_ARTICLE_INITIATED, payload: true },
        { type: CREATE_ARTICLE_SUCCESS, payload: true },
      ],
    );
  });

  it('should retrieve comments', async () => {
    const article = 'react-redux';
    const response_data = {
      comments: {
        id: 14,
        author: 3,
        article: 139,
        body: 'Backend comment react redux',
        parent: null,
        created_at: '2018-11-14T18:17:23.209744Z',
        updated_at: '2018-11-14T18:17:23.209796Z',
        thread_count: 0,
      },
    };
    mock.onGet('/api/articles/react-redux/comments/').reply(200, response_data);
    fetchComments(article)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: GET_COMMENT_INITIATED, payload: true },
        { type: GET_COMMENTS_SUCCESS, payload: response_data },
      ],
    );
  });

  it('should logout a user token is expired', async () => {
    const article = 'react-redux';
    const response_data = {
      comments: {
        id: 14,
        author: 3,
        article: 139,
        body: 'Backend comment react redux',
        parent: null,
        created_at: '2018-11-14T18:17:23.209744Z',
        updated_at: '2018-11-14T18:17:23.209796Z',
        thread_count: 0,
      },
    };
    mock.onGet('/api/articles/react-redux/comments/').reply(403, response_data);
    fetchComments(article)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: GET_COMMENT_INITIATED, payload: true },
        { type: LOGOUT_USER, payload: false },
      ],
    );
  });

  it('should post a comment', async () => {
    const article = 'react-redux';
    const response_data = {
      comments: {
        id: 14,
        author: 3,
        article: 139,
        body: 'Backend comment react redux',
        parent: null,
        created_at: '2018-11-14T18:17:23.209744Z',
        updated_at: '2018-11-14T18:17:23.209796Z',
        thread_count: 0,
      },
    };
    mock.onPost('/api/articles/react-redux/comments/').reply(201, response_data);
    addComment(response_data, article)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: ADD_COMMENT_SUCCESS, payload: true },
      ],
    );
  });
});

describe('likeDislikeAction', () => {
  localStorage.setItem('auth_token', 'token');
  const payload = { reaction: 'Like' };
  const slug = 'testing-1-2-3';

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    store = mockStore({});
  });

  it('should return user artciles', async () => {
    const response_data = {
      article: {
        article: [
          { author: 10, title: 'React Redux' },
        ],
      },
    };

    mock.onGet('/api/article/my-articles/')
      .reply(200, response_data);
    fetchUserArticles()(store.dispatch);

    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: GET_USER_ARTICLES_SUCCESS, payload: response_data.article },
      ],
    );
  });
  it('should like an article', async () => {
    const response = {
      data: {
        Message: 'You have liked this article',
      },
    };
    mock
      .onPost(`/api/articles/${slug}/reaction/`, payload)
      .reply(200, response);
    await store.dispatch(likeDislike(payload, slug));
    expect(store.getActions()).toEqual([
      { type: LIKE_DISLIKE_SUCCESS, payload: true },
    ]);
  });

  it('should remove a like from an article', async () => {
    const error = { detail: 'You have already Liked this article.' };
    mock
      .onPost(`/api/articles/${slug}/reaction/`, payload)
      .reply(400, error);
    mock
      .onDelete(`/api/articles/${slug}/reaction/`, payload)
      .reply(204);
    await store.dispatch(likeDislike(payload, slug));
    expect(store.getActions()).toEqual([
      { type: LIKE_DISLIKE_SUCCESS, payload: true },
    ]);
  });

  it('should not allow reactions when there is an error connection', async () => {
    const detail = 'You are not authenticated for this action';
    const error = { detail: 'You are not authenticated for this action' };
    mock
      .onPost(`/api/articles/${slug}/reaction/`, payload)
      .reply(400, error);
    await store.dispatch(likeDislike(payload, slug));
    expect(store.getActions()).toEqual([
      { type: LIKE_DISLIKE_ERROR, payload: detail },
    ]);
  });
});
