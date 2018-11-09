import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { NewArticle } from '../../components/Articles/NewArticle';

describe('NewArticle component', () => {
  const mockStore = configureMockStore();
  let wrapper;
  const createSpy = (toSpy) => jest.spyOn(wrapper.instance(), toSpy);
  const nextProps = {
    createArticleSuccess: true,
  };
  const props = {
    history: { push: jest.fn() },
    addArticle: jest.fn(),
    resetForm: jest.fn(),
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
    wrapper = shallow(<NewArticle {...props} />);
  });


  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSubmit function when the save button is clicked', () => {
    wrapper.find('#add-article-form').simulate('submit', getEvent());
    expect(props.addArticle).toBeCalled();
  });

  it('should call resetForm function when the clear button is clicked', () => {
    const spy = createSpy('resetForm');
    wrapper.instance().forceUpdate();
    wrapper.find('#clear-button').simulate('click', getEvent());
    expect(spy).toBeCalled();
  });

  it('should change state when onChange event is fired', () => {
    wrapper
      .find('#title').simulate('change', {
        target: { name: 'title', value: 'This Is Andela' },
      });
    expect(wrapper.state().title).toEqual('This Is Andela');
  });

  it('should change state when onChange event is fired in the editor', () => {
    wrapper
      .find('#text-editor')
      .simulate('change', 'Testing the editor');
    expect(wrapper.state().body).toEqual('Testing the editor');
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
