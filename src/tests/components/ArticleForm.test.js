import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ArticleForm from '../../components/Articles/ArticleForm';

describe('ArticleForm component', () => {
  const mockStore = configureMockStore();
  let wrapper;
  const props = {
    handleSubmit: jest.fn(),
    resetForm: jest.fn(),
    handleChange: jest.fn(),
    handleEditorChange: jest.fn(),
    title: '',
    description: '',
    body: '',
    loading: false,
  };

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<ArticleForm
      {...props}
    />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call resetForm when the clear button is clicked', () => {
    wrapper.find('#clear-button').simulate('click', { preventDefault() {} });
    expect(props.resetForm).toBeCalled();
  });

  it('should call handleSubmit when the form is submitted', () => {
    wrapper.find('#add-article-form').simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });

  it('should call handleChange whenever there is an input in title/description', () => {
    wrapper.find('#title').simulate('change');
    expect(props.handleChange).toBeCalled();
  });

  it('should call handleEditorChange whenever there is an input in text editor', () => {
    wrapper.find('#text-editor').simulate('change');
    expect(props.handleEditorChange).toBeCalled();
  });
});
