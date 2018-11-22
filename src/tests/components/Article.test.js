import React from 'react';
import { shallow } from 'enzyme';
import Article from '../../components/Articles/Article';

describe('Article Component', () => {
  let wrapper;
  const article = { author: { username: 'red' }, body: 'just' };

  beforeEach(() => {
    wrapper = shallow(<Article article={article} />);
  });

  it('should render the Article Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
