import React from 'react';
import { mount } from 'enzyme';
import { Articles } from '../../components/Articles/Articles';

describe('Articles Component', () => {
  let wrapper;
  const fetchArticles = jest.fn();
  const articlesPayload = {
    results: [
      { author: 1 },
    ],
  };

  beforeEach(() => {
    wrapper = mount(
      <Articles fetchArticles={fetchArticles} articlesPayload={articlesPayload} />,
    );
  });

  it('should render the Articles Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
