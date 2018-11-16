import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import articleImg from '../../assets/images/articleImg.jpeg';
import user from '../../assets/images/user.png';

function articleCreated(articleDate) {
  const dateTime = new Date(articleDate);
  const dateOnly = dateTime.toDateString();
  return dateOnly;
}

const returnArticleURL = slug => `/articles/${slug}/comments/`;

const SingleArticle = ({ article }) => {
  localStorage.setItem('current_article', article.slug);
  return (
    <div className="row article">
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
              <div className="col-md-3 article-time">
                {articleCreated(article.createdAt)}
                &nbsp;&nbsp;|&nbsp;3 Min
              </div>
              <div className="col-sm-8">
                <i className="fas fa-tags" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row no-gutters">
          <div className="col-auto">
            <img src={articleImg} alt="an article" className="article-img" />
          </div>
          <div className="col-9">
            <div className="card-block px-2">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text article-description">{article.description}</p>
              <p dangerouslySetInnerHTML={{ __html: article.body }} className="my-img" />
            </div>
          </div>
          <div className="card-footer w-100 text-muted">
            <i className="far fa-thumbs-down icon" />
            <i className="far fa-thumbs-up icon" />
            <i className="far fa-star icon" />
            <i className="far fa-bookmark icon" />
            <i className="fas fa-share-alt icon" />
            <NavLink to={returnArticleURL(article.slug)}><i className="far fa-comment icon" /></NavLink>
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
