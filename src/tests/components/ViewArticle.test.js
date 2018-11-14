import React from 'react';
import { shallow } from 'enzyme';
import { ViewArticle } from '../../components/Articles/ViewArticle';


describe('ViewArticle Component', () => {
  let wrapper;
  const fetchSpecificArticle = jest.fn();
  const articlePayload = {
    article:
    { author: { username: 'red' }, body: 'test' },
  };
  const match = { params: { slug: 'your-article' } };

  beforeEach(() => {
    wrapper = shallow(
      <ViewArticle
        fetchSpecificArticle={fetchSpecificArticle}
        articlePayload={articlePayload}
        match={match}
      />,
    );
  });

  it('should render the ViewArticle Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
