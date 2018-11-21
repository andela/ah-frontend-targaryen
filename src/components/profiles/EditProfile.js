import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditProfileForm from './EditProfileForm';
import { updateProfile } from '../../actions/userActions';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { username, bio } = this.props;
    this.state = {
      username,
      bio,
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { avatar } = this.props;
    const { username, bio } = this.state;
    const profileData = {
      profile: {
        username,
        bio,
        avatar,
      },
    };
    const { updateProfile } = this.props;
    updateProfile(profileData);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, bio } = this.state;
    return (
      <div>
        <EditProfileForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          username={username}
          bio={bio}
        />
      </div>
    );
  }
}

EditProfile.propTypes = {
  username: PropTypes.string,
  bio: PropTypes.string,
  avatar: PropTypes.string,
  updateProfile: PropTypes.func.isRequired,
};
EditProfile.defaultProps = {
  username: '',
  bio: '',
  avatar: '',
};

const mapStateToProps = state => ({
  profileUpdateSuccessful: state.user.profileUpdateSuccessful,
});

export { EditProfile as EditProfileTest };
export default connect(mapStateToProps, { updateProfile })(EditProfile);
