import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { EditProfileTest } from '../../components/profiles/EditProfile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('EditProfile component', () => {
  let wrapper;
  const props = {
    username: 'testuser',
    bio: 'bio',
    avatar: 'avatar',
    updateProfile: jest.fn(),
    handleChange: jest.fn(),
  };

  const getEvent = (name = '', value = '') => ({
    preventDefault: jest.fn(),
    target: {
      name,
      value,
    },
  });

  beforeEach(() => {
    const store = mockStore({ intitialState: {} });
    wrapper = shallow(<EditProfileTest {...props} store={store} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should call updateProfile when handleSubmit is called', () => {
    wrapper.instance().handleSubmit(getEvent());
    expect(props.updateProfile).toBeCalled();
  });
  it('should set state when handleChange event is called', () => {
    wrapper.instance().handleChange(getEvent('username', 'testuser'));
    expect(wrapper.state().username).toEqual('testuser');
  });
});
