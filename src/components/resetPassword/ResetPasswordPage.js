import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import ResetPasswordForm from './ResetPasswordForm';
import { resetPassword } from '../../actions/userActions';

export class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: '',
      password2: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { match: { params: { token } } } = this.props;
    localStorage.setItem('auth_token', token);
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
    const { password2 } = this.state;
    const payload = {
      user: {
        password: password2,
      },
    };
    const { dispatch } = this.props;
    dispatch(resetPassword(payload));
  }

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


ResetPasswordPage.defaultProps = {
  updatePasswordSuccess: false,
};


ResetPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  updatePasswordSuccess: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ResetPasswordPage);
