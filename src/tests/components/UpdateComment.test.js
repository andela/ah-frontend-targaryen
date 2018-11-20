import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { UpdateComment } from '../../components/comments/UpdateComment';

describe('UpdateComment component', () => {
  let wrapper;
  const mockStore = configureMockStore();
  const props = {
    history: { push: jest.fn() },
    comment: {
      id: 1,
      body: 'the body',
    },
  };

  const getEvent = (name = '', value = '') => ({
    preventDefault: jest.fn(),
    target: {
      name,
      value,
    },
  });

  const editComment = jest.fn();
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const toggle = jest.fn();
  const getAuthor = jest.fn();
  const canEditBlock = jest.fn();

  const author = 'author_name';

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<UpdateComment
      editComment={editComment}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      toggle={toggle}
      getAuthor={getAuthor}
      canEditBlock={canEditBlock}
      {...props}
    />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set component state on rendering', () => {
    expect(wrapper.state().body).toEqual('the body');
  });

  it('should redirect to login page if user is not authenticated', () => {
    wrapper.setProps({ isLoggedIn: false });
    expect(props.history.push).toBeCalledWith('/login');
  });

  it('should call editComment when handleSubmit is called', () => {
    wrapper.instance().handleSubmit(getEvent());
    expect(editComment).toBeCalled();
  });

  it('should set state when toggle is called', () => {
    wrapper.instance().toggle();
    expect(wrapper.state().modal).toEqual(true);
  });

  it('should set state when handleChange is called', () => {
    wrapper.instance().handleChange('OurValue');
    expect(wrapper.state().body).toEqual('OurValue');
  });

  it('should return modal-display when getAuthor is called', () => {
    wrapper.setState({ currentUser: 'author_name' });
    expect(wrapper.instance().getAuthor(author)).toBe('modal-display');
  });

  it('should return can-edit when canEditBlock is called', () => {
    wrapper.setState({ currentUser: 'author_name' });
    expect(wrapper.instance().canEditBlock(author)).toBe('can-edit');
  });
});
