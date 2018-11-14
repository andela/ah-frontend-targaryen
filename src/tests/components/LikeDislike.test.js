import React from 'react';
import { mount } from 'enzyme';
import { Reactions } from '../../components/Articles/LikeDislike';

let wrapper;

describe('Reactions component', () => {
  const createSpy = (toSpy) => jest.spyOn(wrapper.instance(), toSpy);

  const getEvent = (value = '') => ({
    preventDefault: jest.fn(),
    target: {
      value,
    },
  });

  const props = {
    history: { push: jest.fn() },
    slug: '',
    isLoggedIn: false,
    likeDislike: jest.fn(),
  };

  const state = {
    liked: false,
    disliked: false,
  };

  beforeEach(() => {
    wrapper = mount(<Reactions dispatch={jest.fn} {...props} {...state} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleClick on reacting to an article', () => {
    createSpy('handleClick');
    jest.useFakeTimers();
    wrapper.setProps({ ...{ isLoggedIn: true } });
    wrapper.find('button[value="Like"]').last().simulate('click', getEvent('Like'));
    expect(wrapper.state().liked).toEqual(true);
    expect(setTimeout).toReturnWith(1);

    wrapper.find('button[value="Dislike"]').last().simulate('click', getEvent('Dislike'));
    expect(wrapper.state().disliked).toEqual(true);
    expect(setTimeout).toReturnWith(1);
  });

  it('should redirect if not logged in', () => {
    wrapper.find('button[value="Like"]').simulate('click', getEvent());
    expect(props.history.push).toBeCalledWith('login');
  });
});
