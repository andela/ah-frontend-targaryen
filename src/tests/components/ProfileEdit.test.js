import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Profile } from '../../components/profiles/Profile';

describe('Profile component', () => {
  let wrapper;
  const mockStore = configureMockStore();
  const getProfile = jest.fn();
  const nextProps = {
    isLoggedIn: true,
    profilePayload: { followers: ['user2'], following: ['user2'] },
  };
  const props = {
    history: { push: jest.fn() },
    loading: false,
  };
  const fetchUserArticles = jest.fn();
  const userArticlesPayload = {};

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(
      <Profile
        getProfile={getProfile}
        fetchUserArticles={fetchUserArticles}
        userArticlesPayload={userArticlesPayload}
        {...props}
      />,
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call componentDidMount on rendering', () => {
    expect(getProfile).toBeCalled();
  });

  it('should not redirect if isLoggedIn is false', () => {
    wrapper.setProps({ ...nextProps });
    expect(props.history.push).toBeCalledTimes(0);
  });

  it('should redirect to login page if user is not authenticated', () => {
    wrapper.setProps({ isLoggedIn: false });
    expect(props.history.push).toBeCalledWith('/login');
  });
});
