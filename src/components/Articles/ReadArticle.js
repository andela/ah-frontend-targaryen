import React from 'react';
import PropTypes from 'prop-types';
import user from '../../assets/images/user.png';
import DeleteModal from './DeleteModal';

const articleCreated = articleDate => {
  const dateTime = new Date(articleDate);
  const dateOnly = dateTime.toDateString();
  return dateOnly;
};

const getAuthor = author => {
  const currentUser = localStorage.getItem('username');
  if (currentUser === author) {
    return 'btn-display';
  }
  return 'btn-no-display';
};

const ReadArticle = ({ article, slug }) => (
  <div className="container view-article">
    <div className="row">
      <div className="col-1">
        <img src={user} alt="name" className="img-thumbnail author-thumbnail" />
      </div>
      <div className="col-8 offset-1">
        <div className="row">
          <div className="col-3 author-name">
            <p>
              author:
              {article.author.username}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 article-bio">
            <p>
              {article.author.bio}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-7 article-time">
            <p>
              <span>{articleCreated(article.createdAt)}</span>
              &nbsp;|&nbsp;
              <span>
                {article.reading_time}
                &nbsp; Read
              </span>
            </p>
          </div>
          <div className="col-5">
            <div id="buttons" className={getAuthor(article.author.username)}>
              <input type="button" value="Edit" className="btn-edit" />
              <input type="button" value="Delete" className="btn-delete" data-toggle="modal" data-target="#deleteModal" />
            </div>
            <div>
              <DeleteModal slug={slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12 article-view-description">
        <div className="article-description">{article.description}</div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="article-body" dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </div>
  </div>

);

ReadArticle.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ReadArticle;
