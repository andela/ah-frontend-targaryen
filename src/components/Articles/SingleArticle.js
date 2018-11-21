import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LikeDislike from './LikeDislike';

const articleCreated = articleDate => {
  const dateTime = new Date(articleDate);
  const dateOnly = dateTime.toDateString();
  return dateOnly;
};

const returnArticleURL = slug => `/article/${slug}`;

const returnArticleCommentURL = slug => `/articles/${slug}/comments/`;

const SingleArticle = ({ article }) => {
  localStorage.setItem('current_article', article.slug);
  return (
    <div className="row article">
      <div className="col-12">
        <div className="row entire-article">
          <div className="col-sm-11 article-essentials">
            <div className="row">
              <div className="col-sm-5 author-name">
                authorName
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 article-time">
            <p>
              <span>{articleCreated(article.createdAt)}</span>
              |
              <span>{article.reading_time}</span>
            </p>
          </div>
          <div className="col-sm-4">
            <i className="fas fa-tags" />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row no-gutters">
          <div className="col-9">
            <div className="card-block px-2">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text article-description">{article.description}</p>
              <Link exact to={returnArticleURL(article.slug)}>Read More</Link>
            </div>
          </div>
          <div className="card-footer w-100 text-muted">
            <LikeDislike slug={article.slug} />
            <i className="reaction far fa-bookmark icon" />
            <i className="reaction fas fa-share-alt icon" />
            <Link to={returnArticleCommentURL(article.slug)}><i className="far fa-comment icon" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

SingleArticle.propTypes = {
  article: PropTypes.object.isRequired,
};

export default SingleArticle;
