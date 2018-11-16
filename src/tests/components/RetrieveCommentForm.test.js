import React from 'react';
import { shallow } from 'enzyme';
import { RetrieveCommentForm } from '../../components/comments/RetrieveCommentForm';

describe('RetrieveCommentForm component', () => {
  let wrapper;
  const comment = {};

  beforeEach(() => {
    wrapper = shallow(<RetrieveCommentForm
      comment={comment}
    />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
