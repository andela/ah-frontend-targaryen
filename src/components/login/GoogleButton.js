import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

import { googleLoginUser } from '../../actions/userActions';

class GoogleloginButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        redirect: true,
      });
    }
  }

  signup = (userToken) => {
    const userData = {
      user: {
        access_token: userToken,
      },
    };

    const { googleLoginUser } = this.props;
    googleLoginUser('/api/auth/google/', userData);
  }

  handleGoogleResponse = (response) => {
    const token = response.tokenId;
    this.signup(token);
  }

  render() {
    const value = this.state;
    if (value.redirect) {
      const to = { pathname: '/' };
      return (
        <Redirect to={to} />
      );
    }
    return (
      <div>
        <GoogleLogin
          clientId="1040550554735-0lfo665jrpgkprjkqdvh9njlc46mu6rg.apps.googleusercontent.com"
          redirectUri="/"
          onSuccess={this.handleGoogleResponse}
          onFailure={this.handleGoogleResponse}
          className="google"
        >
          <i className="fa fa-google-plus  icon-with-margin" />
          <span className="raised-font"> Google</span>

        </GoogleLogin>
        &nbsp;

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  loading: state.user.loading,
});

GoogleloginButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  googleLoginUser: PropTypes.func.isRequired,
};

export { GoogleloginButton as GoogleTest };
export default connect(
  mapStateToProps, { googleLoginUser },
)(GoogleloginButton);
