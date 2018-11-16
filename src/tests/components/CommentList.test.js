import React from 'react';
import { shallow } from 'enzyme';
import { CommentList } from '../../components/comments/CommentList';

describe('CommentList component', () => {
  let wrapper;
  const comments = [];
  const map = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<CommentList
      comments={comments}
      map={map}
    />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
