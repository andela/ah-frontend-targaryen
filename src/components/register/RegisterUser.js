import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUsers } from '../../actions/userActions';

export class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.registerUserSuccess === true) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, username } = this.state;
    const payload = {
      user: {
        email,
        password,
        username,
      },
    };

    const { getUsers } = this.props;
    getUsers(payload);
  }

  render() {
    const { email, password, username } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="registerForm">
              <h1 className="text-center">Register</h1>
              <form id="form" className="registerUser" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="control-label" htmlFor="email">Email</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="fas fa-envelope" /></div>
                    </div>
                    <input type="text" name="email" className="form-control" id="email" value={email} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="username">Username</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="fas fa-user" /></div>
                    </div>
                    <input type="text" className="form-control" name="username" id="username" value={username} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="password">Password</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="fas fa-key" /></div>
                    </div>
                    <input type="password" className="form-control" name="password" id="password" value={password} onChange={this.handleChange} />
                  </div>
                </div>
                <button className="btn btn-block btn-primary" type="submit" value="Submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registerUserSuccess: state.user.registerUserSuccess,
  registerUserError: state.user.registerUserError,
});

RegisterUser.propTypes = {
  getUsers: PropTypes.func.isRequired,
  registerUserSuccess: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

RegisterUser.defaultProps = {
  registerUserSuccess: false,
};

export default connect(mapStateToProps, { getUsers: fetchUsers })(RegisterUser);
