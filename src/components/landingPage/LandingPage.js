import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Articles from '../Articles/Articles';
import Dashboard from '../dashboard/Dashboard';

export const LandingPage = ({ isLoggedIn }) =>
  (
    <div>
      {!isLoggedIn
        ? (<React.Fragment>
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
        ) : (
          <Dashboard />
        )
      }
    </div>
  );

LandingPage.propTypes = {
  isLoggedIn: PropTypes.bool,
};

LandingPage.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(LandingPage);
