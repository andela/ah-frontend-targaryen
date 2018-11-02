import React from 'react';

const Navbar = () => (
  <nav className="navbar container-fluid navbar-expand-lg nav-bg">
    <a className="navbar-brand nav-text col-sm-10" href="#">Authors Haven</a>
    <button
      className="navbar-toggler  navbar-dark"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link nav-text" href="#">
            Signup
            <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link nav-text" href="#">Login</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
