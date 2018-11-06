import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { sendResetLink, resetPassword } from '../../actions/userActions';
import {
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../../actions/types';
import { axiosInstance } from '../../config/axiosInstance';

describe('resetPasswordAction', () => {
  let store;
  let mock;
  localStorage.setItem('auth_token', 'token');

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    store = mockStore({});
  });

  it('should send user details to get email link', async () => {
    const response_data = {
      user: { message: 'Check your email for reset password link' },
    };
    mock.onPost('/api/users/password_reset/').reply(200, response_data);
    await store.dispatch(sendResetLink({}));
    expect(store.getActions()).toEqual(
      [
        { type: SEND_RESET_LINK_SUCCESS, payload: true },
      ],
    );
  });

  it('should not accept invalid details', async () => {
    const errorMessage = 'Please enter a valid email';
    mock.onPost('/api/users/password_update/').reply(400, 'Invalid data sent');
    await store.dispatch(sendResetLink());
    expect(store.getActions()).toEqual(
      [
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
    mock
      .onPut('/api/users/password_update/')
      .reply(201, response);
    await store.dispatch(resetPassword({}));
    expect(store.getActions()).toEqual([
      { type: RESET_PASSWORD_SUCCESS, payload: true },
    ]);
  });

  it('should not update password when invalid data is sent', async () => {
    const responseError = 'Please enter a valid password';
    mock
      .onPut('/api/users/password_update/')
      .reply(400, responseError);
    await store.dispatch(resetPassword('Please enter a valid password'));
    expect(store.getActions()).toEqual([
      {
        type: RESET_PASSWORD_ERROR,
        payload: responseError,
      },
    ]);
  });
});
