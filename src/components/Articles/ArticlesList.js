import React from 'react';
import PropTypes from 'prop-types';
import SingleArticle from './SingleArticle';

const ArticlesList = ({ articles }) => (
  <div>
    {articles.map(article => (
      <SingleArticle key={article.slug} article={article} />
    ))}
  </div>
);

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default ArticlesList;
