import React from 'react';
import { shallow } from 'enzyme';
import ReadArticle from '../../components/Articles/ReadArticle';

describe('ReadArticle Component', () => {
  let wrapper;
  const article = { author: { username: 'red' }, body: 'just' };

  beforeEach(() => {
    wrapper = shallow(<ReadArticle article={article} />);
  });

  it('should render the ReadArticle Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
