import React from 'react';
import PropTypes from 'prop-types';
import RetrieveCommentForm from './RetrieveCommentForm';

export const CommentList = ({ comments, article }) => (
  <div>
    {comments.map(comment => (
      <RetrieveCommentForm comment={comment} article={article} />
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array,
  article: PropTypes.string,
};

CommentList.defaultProps = {
  comments: [],
  article: '',
};

export default CommentList;
