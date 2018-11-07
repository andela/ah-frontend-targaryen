import React from 'react';
import a_200 from '../../assets/a_200.png';
import user from '../../assets/user.jpeg';
import { NavLink } from 'react-router-dom';

const SingleArticle = ({ article }) => (
  <div className="container">
    <div className="row">
      <div className="col-sm-2 col-md-2">
        <img src={user} className="img-thumbnail" alt="" />
      </div>
      <div className="col-sm-11">
        <div className="row">
          <div className="col-sm-5">
            {article.author}
          </div>
        </div>
        <div className="row">
          <div className="col-md-1">
            Jun 3
          </div>
          <div className="col-md-1">
          3 Min
          </div>
          <div className="col-sm-7">
            <i className="fas fa-tag"> tag</i>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="card flex-row flex-wrap">
      <div className="card-header border-0">
        <img src={a_200} alt="" className="article-img" />
      </div>
      <div className="card-block px-2">
        <h4 className="card-title">Authors Haven</h4>
        <p className="card-text">Description of this app</p>
        <a href="#" className="btn btn-primary">
          BUTTON
        </a>
      </div>
      <div className="w-100" />
      <div className="cats-footer w-100 text-muted">My footer for this card</div>
    </div> */}
    <div className="card">
      <div className="row no-gutters">
        <div className="col-auto">
          <img src={a_200} alt="an article" className="article-img" />
        </div>
        <div className="col">
          <div className="card-block px-2">
            <h4 className="card-title">{article.title}</h4>
            <p className="card-text">{article.description}</p>
            <NavLink to='article'>View More</NavLink>
          </div>
        </div>
      </div>
      <div className="card-footer w-100 text-muted">A footer, maybe!</div>
    </div>
  </div>
);

export default SingleArticle;
