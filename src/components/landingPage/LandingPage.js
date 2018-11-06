import React from 'react';
import Articles from '../Articles/Articles';

const LandingPage = () => (
  <React.Fragment>
    <div className="first-section">
      <div className="container">
        <div className="row">
          <div className="col-12 jumbotron mx-auto lp-intro lp-text">
            <p>Authors Haven is the one stop hub for knowledge.</p>
            <p>Come take a look at thousands of articles.</p>
            <p>You can even share your own!!!</p>
            <a href="#start" className="btn ah-btn">
              Join us and share your ideas
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid article-list">
      <Articles />
    </div>
  </React.Fragment>
);

export default LandingPage;
