import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import PrivateRoute from '../../components/routes/PrivateRoute';

class TestComponent extends Component {
  render() {
    return (
      <h1>Test Component</h1>
    );
  }
}

describe('PrivateRoute Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <PrivateRoute
          component={TestComponent}
        />
      </BrowserRouter>,
    );
  });


  it('should render correctly', () => {
    localStorage.setItem('auth_token', 'my athentication token');
    wrapper = shallow(
      <BrowserRouter>
        <PrivateRoute
          component={TestComponent}
        />
      </BrowserRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render TestComponent if the auth_token is valid', () => {
    localStorage.setItem('auth_token', 'my athentication token');
    expect(wrapper.find(TestComponent)).toBeTruthy();
  });
});
