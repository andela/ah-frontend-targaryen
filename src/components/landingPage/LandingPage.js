import React from 'react';

const DisplayArticles = () => (
  <div className="article">
    <div className="article-content float-sm-bottom LP-list">
      <a href="#list-articles">
        List Articles Place Holder
      </a>
    </div>
  </div>
);

const LandingPage = () => (
  <React.Fragment>
    <div className="container LP-container">
      <div className="row jumbotron mx-auto LP-text">
        <h1>
          Authors Haven is the one stop hub for knowledge.
          <br />
          Come take a look at thousands of articles.
          <br />
          You can even share your own!!!
        </h1>
        <a href="#start" className="btn btn-outline btn-xl js-scroll-trigger join-us-text">
          Join us and share your ideas
        </a>
      </div>
      <div className="display-articles mx-auto">
        <DisplayArticles />
      </div>
    </div>
  </React.Fragment>
);

export default LandingPage;
