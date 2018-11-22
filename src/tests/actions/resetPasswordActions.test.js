import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { sendResetLink, resetPassword } from '../../actions/userActions';
import {
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  SEND_RESET_LINK_INITIATED,
} from '../../actions/types';
import axiosInstance from '../../config/axiosInstance';

describe('resetPasswordAction', () => {
  let store;
  let mock;
  let mockRealAxios;
  localStorage.setItem('reset_password_token', 'token');
  const payload = {
    user: {
      password: 'password',
    },
  };
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    mockRealAxios = new MockAdapter(axios);
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    store = mockStore({});
  });

  it('should send user details to get email link', async () => {
    const response_data = {
      user: { message: 'Check your email for reset password link' },
    };
    mock.onPost('/api/users/password_reset/').reply(200, response_data);
    store.dispatch(sendResetLink({}));
    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: SEND_RESET_LINK_INITIATED, payload: true },
        { type: SEND_RESET_LINK_SUCCESS, payload: true },
      ],
    );
  });

  it('should not accept invalid details', async () => {
    const errorMessage = 'Please enter a valid email';
    mock.onPost('/api/users/password_update/').reply(400, 'Invalid data sent');
    store.dispatch(sendResetLink());
    await flushAllPromises();
    expect(store.getActions()).toEqual(
      [
        { type: SEND_RESET_LINK_INITIATED, payload: true },
        { type: SEND_RESET_LINK_ERROR, payload: errorMessage },
      ],
    );
  });

  it('should update the password', async () => {
    const response = {
      user: {
        message: 'Successfully updated password',
      },
    };
    mockRealAxios
      .onPut('https://ah-backend-targaryen-staging.herokuapp.com/api/users/password_update/', payload)
      .reply(201, response);
    store.dispatch(resetPassword(payload));
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { type: RESET_PASSWORD_SUCCESS, payload: true },
    ]);
  });

  it('should not update password when invalid data is sent', async () => {
    const errors = ['Please enter a valid password'];
    const error = { errors: ['Please enter a valid password'] };
    mockRealAxios
      .onPut('https://ah-backend-targaryen-staging.herokuapp.com/api/users/password_update/', payload)
      .reply(400, error);
    store.dispatch(resetPassword(payload));
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { type: RESET_PASSWORD_ERROR, payload: errors[0] },
    ]);
  });

  it('should not update password when network is down', async () => {
    mockRealAxios
      .onPut('https://ah-backend-targaryen-staging.herokuapp.com/api/users/password_update/', payload)
      .networkError();
    store.dispatch(resetPassword(payload));
    await flushAllPromises();
    expect(store.getActions()).toEqual([]);
  });
});
