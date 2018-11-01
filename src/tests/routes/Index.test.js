import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import LandingPage from '../../components/landingPage/LandingPage';
import Login from '../../components/login/Login';
import NotFound from '../../components/notFound/NotFound';

describe('Routes component', () => {
  it('should return app component for the root path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <LandingPage />
      </MemoryRouter>,
    );
    expect(wrapper.find(LandingPage)).toHaveLength(1);
  });

  it('should return the login component for "/login" route path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
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
});
