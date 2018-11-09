import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  fetchUsers,
  loginUser,
  googleLoginUser,
  facebookLoginUser,
} from '../../actions/userActions';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
} from '../../actions/types';
import axiosInstance from '../../config/axiosInstance';

describe('userAction', () => {
  let store;
  let mock;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    const mockStore = configureMockStore([thunk]);
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

  it('should login a user', async () => {
    const response = {
      token: 'token',
      user: {
        email: 'toniks@gmail.com',
        password: 'password1',
      },
    };
    mock
      .onPost('/api/users/login/')
      .reply(200, response);
    loginUser()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { type: LOGIN_USER_SUCCESS, payload: true },
    ]);
  });

  it('should not login a user without a valid email or password', async () => {
    const response = {
      token: 'token',
      errors: {
        error: ['A user with this email and password was not found.'],
      },
    };
    const errorResponse = response.errors.error[0];
    mock
      .onPost('/api/users/login/')
      .reply(400, response);
    loginUser()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      {
        type: LOGIN_USER_ERROR,
        payload: errorResponse,
      },
    ]);
  });
  it('should have social login initiated with google', async () => {
    const user_data = {
      user: {
        access_token: 'token',
      },
    };
    const type = [{ type: SOCIAL_LOGIN_INITIATED }];
    googleLoginUser('/api/auth/google/', user_data)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual(type);
  });
  it('should have social login initiated with facebook', async () => {
    const user_data = {
      user: {
        access_token: 'token',
      },
    };
    const type = [{ type: SOCIAL_LOGIN_INITIATED }];
    facebookLoginUser('/api/auth/facebook/', user_data)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual(type);
  });
  it('should have social login successful google', () => {
    const response = {
      user: {
        access_token: 'token',
      },
    };
    const user_data = {
      user: {
        access_token: 'token',
      },
    };
    const expectedActions = [
      { type: SOCIAL_LOGIN_INITIATED },
      { type: SOCIAL_LOGIN_SUCCESS },
    ];
    mock
      .onPost('/api/auth/google/', user_data)
      .reply(200, response);
    store.dispatch(googleLoginUser('/api/auth/google/', user_data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should have social login successful facebook', () => {
    const response = {
      user: {
        access_token: 'token',
      },
    };
    const user_data = {
      user: {
        access_token: 'token',
      },
    };
    const expectedActions = [
      { type: SOCIAL_LOGIN_INITIATED },
      { type: SOCIAL_LOGIN_SUCCESS },
    ];
    mock
      .onPost('/api/auth/facebook/', user_data)
      .reply(200, response);
    store.dispatch(facebookLoginUser('/api/auth/facebook/', user_data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
