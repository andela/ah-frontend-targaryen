import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/App.css';
import { logOut } from '../../actions/userActions';

export class Logout extends Component {
  componentWillMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn === true) {
      const { logOut } = this.props;
      logOut();
      const { history } = this.props;
      history.push('/login');
    }
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  logOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
};

Logout.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps, { logOut })(Logout);
