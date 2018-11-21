import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  fetchUsers,
  loginUser,
  googleLoginUser,
  facebookLoginUser,
  getProfile,
  updateLoginStatus,
  updateProfile,
} from '../../actions/userActions';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
  GET_PROFILE_PAYLOAD,
  GET_PROFILE_INITIATED,
  UPDATE_PROFILE_INITIATED,
  UPDATE_PROFILE_SUCCESS,
} from '../../actions/types';
import axiosInstance from '../../config/axiosInstance';

describe('userAction', () => {
  let store;
  let mock;
  let mockRealAxios;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    mockRealAxios = new MockAdapter(axios);
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

  it('should set get profile initiated to true', () => {
    getProfile()(store.dispatch);
    expect(store.getActions()).toEqual(
      [
        { type: GET_PROFILE_INITIATED, payload: true },
      ],
    );
  });

  it('should return user profile details', () => {
    const username = 'user1';
    const response_data = {
      token: 'my secret token',
      profile: {
        username: 'user1',
        bio: 'My bio',
        avatar: 'avatar image',
        following: ['user2'],
        followers: ['user2'],
      },
    };
    localStorage.setItem('username', username);
    mockRealAxios.onGet(`https://ah-backend-targaryen-staging.herokuapp.com/api/profiles/${username}/`).reply(200, response_data);
    store.dispatch(getProfile())
      .then(() => {
        expect(store.getActions()).toEqual(
          [
            { payload: true, type: GET_PROFILE_INITIATED },
            {
              payload: {
                avatar: 'avatar image', bio: 'My bio', followers: ['user2'], following: ['user2'], username: 'user1',
              },
              type: GET_PROFILE_PAYLOAD,
            },
          ],
        );
      });
  });

  it('should redirect to login page is token is invalid', () => {
    const response_data = {
      token: 'my secret token',
      profile: {
        username: 'user1',
        bio: 'My bio',
        avatar: 'https://pixabay.com/en/user-person-people-profile-account-1633249/',
        following: ['user2'],
        followers: ['user2'],
      },
    };
    mockRealAxios.onGet('https://ah-backend-targaryen-staging.herokuapp.com/api/profiles/user1/').reply(403, response_data);
    store.dispatch(getProfile())
      .then(() => {
        expect(store.getActions()).toEqual(
          [
            { type: GET_PROFILE_INITIATED, payload: true },
            { type: LOGOUT_USER, payload: false },
          ],
        );
      });
  });

  it('should keep user logged in if token is not expired', () => {
    localStorage.setItem('auth_token', 'my athentication token');
    store.dispatch(updateLoginStatus());
    expect(store.getActions()).toEqual(
      [
        { type: LOGIN_USER_SUCCESS, payload: true },
      ],
    );
  });

  it('should logout user if token is expired', () => {
    localStorage.setItem('auth_token', '');
    store.dispatch(updateLoginStatus());
    expect(store.getActions()).toEqual(
      [
        { type: LOGIN_USER_SUCCESS, payload: false },
      ],
    );
  });
  it('should update the profile', () => {
    const profileData = {
      profile: {
        username: 'userTwo',
        bio: 'updated bio',
        avatar: 'https://pixabay.com/en/user-person-people-profile-account-1633249/',
        following: ['userOne'],
        followers: ['userOne'],
      },
    };
    const expectedActions = [
      { type: UPDATE_PROFILE_INITIATED },
      { type: UPDATE_PROFILE_SUCCESS },
      { type: GET_PROFILE_PAYLOAD },
    ];
    const response = {
      profile: {
        username: 'user1',
        bio: 'My bio',
        avatar: 'https://pixabay.com/en/user-person-people-profile-account-1633249/',
      },
    };
    mock.onPut('https://ah-backend-targaryen-staging.herokuapp.com/api/profiles/update/', profileData)
      .reply(200, response);
    store.dispatch(updateProfile(profileData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should should not update profile if there is an error', () => {
    const profileData = {
      profile: {
        username: 'user1',
        bio: 'My bio',
        avatar: 'https://pixabay.com/en/user-person-people-profile-account-1633249/',
        following: ['user2'],
        followers: ['user2'],
      },
    };
    const expectedActions = [
      { type: UPDATE_PROFILE_INITIATED },
    ];
    const response = {
      profile: {
        username: 'user1',
        bio: 'My bio',
      },
    };
    mock.onPut('https://ah-backend-targaryen-staging.herokuapp.com/api/profiles/update/', profileData)
      .reply(400, response);
    store.dispatch(updateProfile(profileData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
