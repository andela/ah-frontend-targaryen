import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SendResetLinkForm from './ForgotPasswordForm';
import { sendResetLink } from '../../actions/userActions';

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sendLinkSuccess === true) {
      const { history } = this.props;
      history.push('/');
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, username } = this.state;
    const payload = {
      user: {
        email,
        username,
      },
    };
    const { dispatch } = this.props;
    dispatch(sendResetLink(payload));
  }

  render() {
    const { username, email } = this.state;
    const { resetPasswordloading } = this.props;
    return (
      <SendResetLinkForm
        onChange={this.handleChange}
        onSave={this.handleSubmit}
        username={username}
        email={email}
        loading={resetPasswordloading}
      />
    );
  }
}

export const mapStateToProps = state => ({
  sendLinkSuccess: state.user.sendLinkSuccess,
  sendLinkError: state.user.sendLinkError,
  resetPasswordloading: state.user.resetPasswordloading,
});

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sendLinkSuccess: PropTypes.bool,
  resetPasswordloading: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

ForgotPassword.defaultProps = {
  sendLinkSuccess: false,
  resetPasswordloading: false,
};

export default connect(mapStateToProps)(ForgotPassword);
