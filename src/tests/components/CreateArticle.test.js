import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { CreateArticle } from '../../components/Articles/CreateArticle';

describe('CreateArticle component', () => {
  const mockStore = configureMockStore();
  let wrapper;

  const nextProps = {
    createArticleSuccess: true,
  };
  const props = {
    history: { push: jest.fn() },
    addArticle: jest.fn(),
    resetForm: jest.fn(),
    handleChange: jest.fn(),
    handleEditorChange: jest.fn(),
  };
  const getEvent = (name = '', value = '') => ({
    preventDefault: jest.fn(),
    target: {
      name,
      value,
    },
  });

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<CreateArticle
      {...props}
    />);
  });


  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });


  it('should call addArticle when handleSubmit is called', () => {
    wrapper.instance().handleSubmit(getEvent());
    expect(props.addArticle).toBeCalled();
  });

  it('should call resetForm function when the clear button is clicked', () => {
    wrapper.instance().resetForm();
    expect(wrapper.state().title).toEqual('');
  });

  it('should set state for article body when handleEditorChange is called', () => {
    wrapper.instance().handleEditorChange('The Body of an article');
    expect(wrapper.state().body).toEqual('The Body of an article');
  });

  it('should set state for title/description when handleChange event is called', () => {
    wrapper.instance().handleChange(getEvent('title', 'The title'));
    expect(wrapper.state().title).toEqual('The title');
  });

  it('should not redirect if article was not posted successfully', () => {
    wrapper.setProps({ createArticleSuccess: false });
    expect(props.history.push).toBeCalledTimes(0);
  });

  it('should redirect if the article is posted successfully', () => {
    wrapper.setProps({ ...nextProps });
    expect(props.history.push).toBeCalledWith('/dashboard');
  });
});
