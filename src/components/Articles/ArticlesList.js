import React from 'react';
import SingleArticle from './SingleArticle';

const ArticlesList = ({articles}) => {
  console.log('articles', articles);
  return (
    <div>
      {articles.map(article => (
        <SingleArticle key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticlesList;
