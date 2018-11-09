import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import axiosInstance from '../../config/axiosInstance';
import fetchArticles from '../../actions/articleActions';
import { GET_ALL_ARTICLES_SUCCESS } from '../../actions/types';

describe('articleAction', () => {
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
});
