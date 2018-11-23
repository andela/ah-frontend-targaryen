import { shallow } from 'enzyme';
import React from 'react';
import EditProfileForm from '../../components/profiles/EditProfileForm';

describe('EditProfileForm', () => {
  let wrapper;
  const props = {
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    bio: 'Brief bio',
    username: 'testuser',
    loading: false,
  };
  beforeEach(() => {
    wrapper = shallow(<EditProfileForm {...props} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should call handleSubmit when the form is submitted', () => {
    wrapper.find('#edit-profile-form').simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });
  it('should call handleChange whenever there is a change in the username field', () => {
    wrapper.find('#username').simulate('change');
    expect(props.handleChange).toBeCalled();
  });
  it('should call handleChange whenever there is a change in the bio field', () => {
    wrapper.find('#bio').simulate('change');
    expect(props.handleChange).toBeCalled();
  });
});
