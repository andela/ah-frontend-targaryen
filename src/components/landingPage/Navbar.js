import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import img from '../../assets/images/logo.png';
import { updateLoginStatus } from '../../actions/userActions';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const { updateLoginStatus } = this.props;
    updateLoginStatus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn === true) {
      this.state.isLoggedIn = true;
    }
  }

  render() {
    const username = localStorage.getItem('username');
    const { isLoggedIn } = this.props;
    return (
      <nav className="navbar fixed-top navbar-expand-lg nav-bg">
        <div className="container">
          <img src={img} className="image-fluid" alt="" />
          <h6 className="navbar-brand" href="#">Authors Haven</h6>
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
            <ul className="navbar-nav ml-auto">
              {isLoggedIn
                ? (
                  <React.Fragment>
                    <li className="nav-item active">
                      <div className="btn ah-btn ah-btn-nav js-scroll-trigger nav-link nav-text ah-nav-profile dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-user" />
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <NavLink className="dropdown-item" to="/create-article/">New Article</NavLink>
                          <NavLink className="dropdown-item" to={`/profiles/${username}`}>Profile</NavLink>
                          <div className="dropdown-divider" />
                          <NavLink className="dropdown-item" to="#">Logout</NavLink>
                        </div>
                      </div>
                    </li>
                  </React.Fragment>
                )
                : (
                  <React.Fragment>
                    <li className="nav-item active">
                      <NavLink className="btn ah-btn ah-btn-nav js-scroll-trigger nav-link nav-text" to="signup">
                        Signup
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="btn ah-btn ah-btn-nav js-scroll-trigger nav-link nav-text" to="login">Login</NavLink>
                    </li>
                  </React.Fragment>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

const matchDispatchToProps = (dispatch) => bindActionCreators({
  updateLoginStatus,
}, dispatch);

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  updateLoginStatus: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  isLoggedIn: false,
};

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
