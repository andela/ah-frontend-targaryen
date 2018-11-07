import React from 'react';
import SingleArticle from './SingleArticle';

const ArticlesList = ({ articles }) => (
  <div>
    {articles.map(article => (
      <SingleArticle key={article.id} article={article} />
    ))}
  </div>
);

export default ArticlesList;
