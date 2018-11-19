import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/App.css';
import {
  loginUser,
  facebookLoginUser,
} from '../../actions/userActions';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn === true) {
      this.redirectHome();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn === true) {
      this.redirectHome();
    }
  }

  redirectHome = () => {
    const { history } = this.props;
    history.push('/dashboard');
  };

  handleInput = event => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { password } = this.state;
    const payload = {
      user: {
        email,
        password,
      },
    };
    const { signIn } = this.props;
    signIn(payload);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className="registerForm" id="login-form" onSubmit={this.handleSubmit}>
              <h3 className="text-center"> Log in </h3>
              <div className="form-group">
                <label className="control-label" htmlFor="email">Email</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text"><i className="fas fa-envelope" /></div>
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    value={email}
                    placeholder="Enter email address"
                    onChange={this.handleInput}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="password">Password</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text"><i className="fas fa-key" /></div>
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={this.handleInput}
                    required
                  />
                </div>
              </div>
              <button id="login_submit" type="submit" className="btn btn-primary btn-block">
                Login
              </button>
              <div className="form-group">
                <Link className="forgot-password" exact to="/forgotPassword">Forgot password?</Link>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <GoogleButton />
                </div>
                <div className="col-md-6 ">
                  <FacebookButton facebookLoginUserAction={facebookLoginUser} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

Login.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoginPending: state.user.isLoginPending,
  isLoggedIn: state.user.isLoggedIn,
  loginError: state.user.loginError,
});

export default connect(mapStateToProps, { signIn: loginUser })(Login);
