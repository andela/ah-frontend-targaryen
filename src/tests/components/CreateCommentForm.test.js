import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { CreateCommentForm } from '../../components/comments/CreateCommentForm';

describe('CreateCommentForm component', () => {
  let wrapper;
  const mockStore = configureMockStore();
  const onSubmit = jest.fn();
  const onChange = jest.fn();
  const onClick = jest.fn();
  const body = '';

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<CreateCommentForm
      onChange={onChange}
      onClick={onClick}
      onSubmit={onSubmit}
      body={body}
    />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick if reset button is clicked', () => {
    wrapper.find('#clear-button').simulate('click', { preventDefault() {} });
    expect(onClick).toBeCalled();
  });

  it('should call onSubmit if form is submitted', () => {
    wrapper.find('#add-comment-form').simulate('submit');
    expect(onSubmit).toBeCalled();
  });

  it('should call onChange when text is entered', () => {
    wrapper.find('#text-editor').simulate('change');
    expect(onChange).toBeCalled();
  });
});
