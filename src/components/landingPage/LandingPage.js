import React from 'react';

const DisplayArticles = () => (
  <div className="card">
    {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
    <div className="card-body">
      <h5 className="card-title">Nisi cupidatat</h5>
      <p className="card-text">
        Nisi cupidatat magna dolor nulla.
        Incididunt labore aliqua cillum mollit quis tempor do pariatur veniam adipisicing.
        Commodo sit voluptate est laboris irure ex dolor fugiat esse ea mollit.
        Pariatur elit cillum commodo occaecat tempor non mollit eu enim velit
        <br />
        . . .
      </p>
      <a href="#" className="btn ah-btn">View more</a>
    </div>
  </div>
);

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
    <div className="container">
      <div className="display-articles mx-auto row">
        <div className="col-sm-12 col-4 col-md-6"><DisplayArticles /></div>
        <div className="col-sm-12 col-4 col-md-6"><DisplayArticles /></div>
        <div className="col-sm-12 col-4 col-md-6"><DisplayArticles /></div>
      </div>
    </div>
  </React.Fragment>
);

export default LandingPage;
