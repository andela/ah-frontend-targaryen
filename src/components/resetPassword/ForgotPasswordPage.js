import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import SendResetLinkForm from './ForgotPasswordForm';
import { sendResetLink } from '../../actions/userActions';

export class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
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
    const formDetails = this.state;
    return (
      <SendResetLinkForm
        onChange={this.handleChange}
        onSave={this.handleSubmit}
        username={formDetails.username}
        email={formDetails.email}
      />
    );
  }
}

export const mapStateToProps = state => ({
  sendLinkSuccess: state.user.sendLinkSuccess,
  sendLinkError: state.user.sendLinkError,
});

ForgotPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ForgotPasswordPage);
