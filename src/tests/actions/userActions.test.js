import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import { fetchUsers } from '../../actions/userActions';
import { REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from '../../actions/types';
import axiosInstance from '../../config/axiosInstance';

describe('userAction', () => {
  let store;
  let mock;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('should register a user', async () => {
    const response_data = {
      token: 'my secret token',
      user: { email: 'user25@gmail.com', password: 'Abc12345', username: 'user25' },
    };
    mock.onPost('/api/users/').reply(201, response_data);
    fetchUsers()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: REGISTER_USER_SUCCESS, payload: true },
      ],
    );
  });

  it('should not register a user with invalid details', async () => {
    const response_data = {
      token: 'my secret token',
      errors: { email: ['This field may not be blank.'], password: ['This field may not be blank.'], username: ['This field may not be blank.'] },
    };
    const errorMessage = '\nemail: This field may not be blank.\npassword: This field may not be blank.\nusername: This field may not be blank.';
    mock.onPost('/api/users/').reply(400, response_data);
    fetchUsers()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: REGISTER_USER_ERROR, payload: errorMessage },
      ],
    );
  });
});
