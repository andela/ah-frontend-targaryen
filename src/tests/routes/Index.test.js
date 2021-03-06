import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  mount,
  shallow,
} from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LandingPage from '../../components/landingPage/LandingPage';
import { Login } from '../../components/login/Login';
import NotFound from '../../components/notFound/NotFound';
import Dashboard from '../../components/dashboard/Dashboard';

const mockStore = configureStore([]);
let store;

describe('Routes component', () => {
  beforeEach(() => {
    const data = {
      user: {
        isLoggedIn: true,
      },
    };
    store = mockStore(data);
  });

  it('should return app component for the root path', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/']}>
        <LandingPage />
      </MemoryRouter>,
    );
    expect(wrapper.find(LandingPage)).toHaveLength(1);
  });

  it('should return the login component for "/login" route path', () => {
    const props = {
      history: { push: jest.fn() },
      signIn: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <Provider store={store}>
          <Login {...props} />
        </Provider>
      </MemoryRouter>,
    );
    expect(wrapper.find(Login)).toHaveLength(1);
  });
  it('should return the NotFound component for incorrect path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/none']}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(wrapper.find(NotFound)).toHaveLength(1);
  });
  it('should return the dashboard for the "/dashboard" route path', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(wrapper.find(Dashboard)).toHaveLength(1);
  });
});
