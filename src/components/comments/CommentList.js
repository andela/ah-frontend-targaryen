import React from 'react';
import PropTypes from 'prop-types';
import RetrieveCommentForm from './RetrieveCommentForm';

export const CommentList = ({ comments }) => (
  <div>
    {comments.map(comment => (
      <RetrieveCommentForm key={comment.id} comment={comment} />
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array,
};

CommentList.defaultProps = {
  comments: [],
};

export default CommentList;
