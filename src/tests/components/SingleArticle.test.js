import React from 'react';
import { shallow } from 'enzyme';
import SingleArticle from '../../components/Articles/SingleArticle';

describe('SingleArticle Component', () => {
  let wrapper;
  const article = {};

  beforeEach(() => {
    wrapper = shallow(
      <SingleArticle article={article} />,
    );
  });

  it('should render the SingleArticle Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
