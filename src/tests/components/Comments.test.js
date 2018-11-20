import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Comments } from '../../components/comments/Comments';

describe('Comments component', () => {
  let wrapper;
  const mockStore = configureMockStore();
  const fetchComments = jest.fn();
  const addComment = jest.fn();
  const commentsPayload = {
    comments: [
      { id: 1 },
    ],
  };
  const props = {
    history: { push: jest.fn() },
    commentsPayload: {
      comments: [
        { id: 1 },
      ],
    },
    match: {
      params: { article: 'slug' },
    },
  };
  const nextProps = {
    addCommentSuccess: true,
  };

  Object.defineProperty(window.location, 'reload', {
    configurable: true,
  });

  window.location.reload = jest.fn();

  const getEvent = (name = '', value = '') => ({
    preventDefault: jest.fn(),
    target: {
      name,
      value,
    },
  });

  const handleSubmit = jest.fn();
  const resetForm = jest.fn();

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<Comments
      fetchComments={fetchComments}
      addComment={addComment}
      commentsPayload={commentsPayload}
      handleSubmit={handleSubmit}
      resetForm={resetForm}
      {...props}
    />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call componentDidMount on rendering', () => {
    expect(fetchComments).toBeCalled();
  });

  it('should not reload if addCommentSuccess is false', () => {
    wrapper.setProps({ addCommentSuccess: false });
    expect(window.location.reload).toBeCalledTimes(0);
  });

  it('should not redirect if isLoggedIn is false', () => {
    wrapper.setProps({ ...nextProps });
    expect(props.history.push).toBeCalledTimes(0);
  });

  it('should redirect to login page if user is not authenticated', () => {
    wrapper.setProps({ isLoggedIn: false });
    expect(props.history.push).toBeCalledWith('/login');
  });

  it('should call addComment when handleSubmit is called', () => {
    wrapper.instance().handleSubmit(getEvent());
    expect(addComment).toBeCalled();
  });

  it('should set body to empty string when resetForm is called', () => {
    wrapper.instance().resetForm();
    expect(wrapper.state().body).toEqual('');
  });

  it('should set body to given value when handleEditorChange is called', () => {
    wrapper.instance().handleEditorChange('OurValue');
    expect(wrapper.state().body).toEqual('OurValue');
  });
});
