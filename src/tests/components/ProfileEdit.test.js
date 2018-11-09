import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Profile } from '../../components/profiles/Profile';

describe('Profile component', () => {
  let wrapper;
  const mockStore = configureMockStore();
  const getProfile = jest.fn();
  const nextProps = {
    getProfileInitiated: true,
    getProfilePayload: { followers: ['user2'], following: ['user2'] },
  };

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<Profile getProfile={getProfile} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call componentDidMount on rendering', () => {
    expect(getProfile).toBeCalled();
  });

  it('should not set loaded to true if getProfileInitiated is false', () => {
    wrapper.setProps({ getProfileInitiated: false });
    expect(wrapper.state('loaded')).toEqual(false);
  });

  it('should set loaded to true on retreival of data', () => {
    wrapper.setProps({ ...nextProps });
    expect(wrapper.state('loaded')).toEqual(true);
  });
});
