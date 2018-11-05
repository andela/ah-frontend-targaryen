import React from 'react';
import { NavLink } from 'react-router-dom';
import img from '../../assets/logo.png';

const Navbar = () => (
  <nav className="navbar fixed-top navbar-expand-lg nav-bg">
    <img src={img} className="image-fluid" alt="" />
    <h6 className="navbar-brand col-sm-10" href="#">Authors Haven</h6>
    <button
      className="navbar-toggler  navbar-light"
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
          <NavLink className="btn ah-btn ah-btn-nav js-scroll-trigger nav-link nav-text" to="signup">
            Signup
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="btn ah-btn ah-btn-nav js-scroll-trigger nav-link nav-text" to="login">Login</NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
