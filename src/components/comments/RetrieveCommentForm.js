import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import user from '../../assets/images/user.png';
import UpdateComment from './UpdateComment';

export const RetrieveCommentForm = ({ comment, article }) => (
  <div className="row comment">
    <div className="col-12">
      <div className="row entire-article">
        <div className="col-sm-1">
          <img src={user} className="img-thumbnail author-thumbnail" alt="" />
        </div>
        <div className="col-sm-11 article-essentials">
          <div className="row">
            <div className="col-sm-5 author-name">
              authorname
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 article-time">
              <i className="far fa-clock" />
              &nbsp;&nbsp;
              <Moment fromNow>{comment.created_at}</Moment>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row no-gutters-comments">
          <div className="col-9">
            <div className="card-block px-2">
              <p dangerouslySetInnerHTML={{ __html: comment.body }} className="my-img" />
            </div>
          </div>
        </div>
        <div className="card-footer w-100 text-muted">
          <UpdateComment slug={article} comment={comment} />
          <i className="far fa-thumbs-down icon" />
          <i className="far fa-thumbs-up icon" />
          <i className="far fa-star icon" />
          <i className="far fa-bookmark icon" />
          <i className="fas fa-share-alt icon" />
          <i className="fas fa-reply icon" data-toggle="collapse" data-target={`#${comment.id}`} />
        </div>
        <div>
          <div className="collapse" id={`${comment.id}`}>
            <div className="col-9">
              <div className="card-block px-2">
                <p dangerouslySetInnerHTML={{ __html: 'Replies to this comment' }} className="my-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

);

RetrieveCommentForm.propTypes = {
  comment: PropTypes.object.isRequired,
  article: PropTypes.string.isRequired,
};

export default RetrieveCommentForm;
