import React from 'react';
import Articles from '../Articles/Articles';

const Dashboard = () => (
  <div>
    <div className="dashboard-section">
      <div className="inner-dash">
        <div className="container">
          <div className="row">
            <div className="col-12 dash-intro lp-text text-center">
              <p>
                <span className="reading">Reading</span>
                |
                <span className="writing">Writing.</span>
                <span className="intro-text">You are home</span>
              </p>
              <button className="btn btn-success dash-btn" type="button">
                { "Let's Write" }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid article-list dash">
      <Articles />
    </div>
  </div>
);

export default Dashboard;
