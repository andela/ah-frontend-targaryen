import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import { facebookLoginUser } from '../../actions/userActions';

class FacebookButton extends PureComponent {
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
    const { facebookLoginUser } = this.props;
    facebookLoginUser('/api/auth/facebook/', userData);
  }

  handleFacebookResponse = (response) => {
    const token = response.accessToken;
    this.signup(token);
  }

  render() {
    const value = this.state;
    if (value.redirect) {
      const to = { pathname: '/dashboard' };
      return (
        <Redirect to={to} />
      );
    }
    return (
      <FacebookLogin
        appId="2147542838793839"
        fields="name,email,picture"
        callback={this.handleFacebookResponse}
        icon="fa fa-facebook-square icon-with-margin"
        cssClass="facebook"
        textButton="Facebook"

      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  loading: state.user.loading,
});

FacebookButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  facebookLoginUser: PropTypes.func.isRequired,
};
export { FacebookButton as FacebookTest };
export default connect(mapStateToProps, { facebookLoginUser })(FacebookButton);
