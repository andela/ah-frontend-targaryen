import React from 'react';
import { shallow } from 'enzyme';
import ArticlesList from '../../components/Articles/ArticlesList';

describe('ArticlesList Component', () => {
  let wrapper;
  const articles = [{ author: 1 }];

  beforeEach(() => {
    wrapper = shallow(
      <ArticlesList articles={articles} />,
    );
  });

  it('should render the ArticlesList Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
