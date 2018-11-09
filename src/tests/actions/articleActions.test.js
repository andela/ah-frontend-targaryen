import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import axiosInstance from '../../config/axiosInstance';
import { fetchArticles, postArticle } from '../../actions/articleActions';
import {
  GET_ALL_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_INITIATED,
  CREATE_ARTICLE_ERROR,
} from '../../actions/types';


describe('articleActions', () => {
  let store;
  let mock;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

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
        { type: GET_ALL_ARTICLES_SUCCESS, payload: response_data.article },
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
});
