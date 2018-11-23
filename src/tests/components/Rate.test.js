import React from 'react';
import { toast } from 'react-toastify';
import { shallow } from 'enzyme';
import { Rate } from '../../components/Articles/Rate';

let wrapper;

describe('Rate component', () => {
  const context = { router: { history: { push: jest.fn() } } };
  const specificArticle = { article: { rating: 5 } };
  const props = {
    slug: '',
    isLoggedIn: false,
    likeDislike: jest.fn(),
    rateArticle: jest.fn(),
    specificArticle,
    article: { rating: 0 },
    rateSuccessful: false,
  };
  const nextProps = {
    ...props,
    article: { rating: 1 },
    rateSuccessful: true,
  };
  const state = {
    rating: 0,
  };
  const rateSuccess = jest.fn();
  const ratingChanged = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Rate
      ratingChanged={ratingChanged}
      dispatch={jest.fn}
      rateSuccess={rateSuccess}
      {...props}
      {...state}
      {...context}
    />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the rating shown', () => {
    wrapper.setProps({ ...nextProps });
    expect(wrapper.state().rating).toEqual(1);
  });

  it('should not rate if user is not logged in', () => {
    toast.warn = jest.fn();
    wrapper.instance().ratingChanged(4);
    expect(toast.warn).toBeCalled();
  });

  it('should call ratingChanged on rating an article', () => {
    wrapper.setProps({ ...{ isLoggedIn: true } });
    wrapper.instance().ratingChanged(5);
    expect(wrapper.state().rating).toEqual(5);
  });
});
