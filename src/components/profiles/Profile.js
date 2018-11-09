import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import profileImage from '../../assets/images/profileImage.png';
import { getProfile } from '../../actions/userActions';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    const { getProfile } = this.props;
    getProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getProfileInitiated === true) {
      this.setState({ loaded: true });
    }
  }

  render() {
    const { loaded } = this.state;
    const { getProfilePayload } = this.props;
    const profileData = getProfilePayload;
    let followersNumber;
    let followingNumber;
    if (profileData.followers) {
      followersNumber = profileData.followers.length;
      followingNumber = profileData.following.length;
    } else {
      followersNumber = 'loading';
      followingNumber = 'loading';
    }

    return (
      <div>
        <div className="container-fluid ah-container">
          <div>
            <div className="col-9 mx-auto lp-intro">
              <Loader loaded={loaded}>
                <div className="row profile-header ah-container">
                  <div className="col-4">
                    <img className="img-thumbnail profile-image" src={profileImage} alt="avatar" />
                  </div>
                  <div className="col-6 top-buffer">
                    <div className="row">
                      <div className="col-12">
                        <h3 className="profile-username">{ profileData.username }</h3>
                      </div>
                    </div>
                    <div className="row followers-following">
                      <div className="col-3 followers">
                        <p className="">
                          <strong className="big-font">{ `${followersNumber}` }</strong>
                          &nbsp;Followers
                        </p>
                      </div>
                      <div className="col">
                        <p className="">
                          <strong className="big-font">{ `${followingNumber}` }</strong>
                          &nbsp;Following
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <button type="button" className="btn ah-btn">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row bio">
                  <br />
                  <h5>Bio:</h5>
                </div>
                <div className="row bottom-filler bio-body">
                  <p align="justify">
                    { profileData.bio }
                  </p>
                </div>
              </Loader>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getProfilePayload: state.user.getProfilePayload,
  getProfileInitiated: state.user.getProfileInitiated,
});

const matchDispatchToProps = (dispatch) => bindActionCreators({
  getProfile,
}, dispatch);

Profile.propTypes = {
  getProfilePayload: PropTypes.object,
  getProfile: PropTypes.func.isRequired,
  getProfileInitiated: PropTypes.bool,
};

Profile.defaultProps = {
  getProfilePayload: false,
  getProfileInitiated: false,
};

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
