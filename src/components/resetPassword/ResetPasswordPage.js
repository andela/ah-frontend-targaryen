import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ResetPasswordForm from './ResetPasswordForm';
import { resetPassword } from '../../actions/userActions';

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: '',
      password2: '',
    };
  }

  componentDidMount() {
    const { match: { params: { token } } } = this.props;
    localStorage.setItem('reset_password_token', token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updatePasswordSuccess === true) {
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
    const { password2, password1 } = this.state;
    if (password2 === password1) {
      const payload = {
        user: {
          password: password2,
        },
      };
      const { dispatch } = this.props;
      return dispatch(resetPassword(payload));
    }
    return toast.error('Make sure the password entered is the same', { autoClose: 3500, hideProgressBar: true });
  };


  render() {
    const formDetails = this.state;
    return (
      <ResetPasswordForm
        onChange={this.handleChange}
        onSave={this.handleSubmit}
        password1={formDetails.password1}
        password2={formDetails.password2}
      />
    );
  }
}

const mapStateToProps = state => ({
  updatePasswordSuccess: state.user.resetPasswordSuccess,
  updatePasswordError: state.user.resetPasswordError,
});


ResetPassword.defaultProps = {
  updatePasswordSuccess: false,
};


ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  updatePasswordSuccess: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ResetPassword);
