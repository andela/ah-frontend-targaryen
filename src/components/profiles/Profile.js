import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import PropTypes from 'prop-types';
import profileImage from '../../assets/images/profileImage.png';
import { getProfile } from '../../actions/userActions';
import { fetchUserArticles } from '../../actions/articleActions';
import ArticlesList from '../Articles/ArticlesList';

export class Profile extends Component {
  componentDidMount() {
    const { getProfile, fetchUserArticles } = this.props;
    getProfile();
    fetchUserArticles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn === false) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  render() {
    const {
      loading, profilePayload: {
        followers, following, username, bio,
      }, userArticlesPayload,
    } = this.props;

    let followersNumber;
    let followingNumber;
    if (followers) {
      followersNumber = followers.length;
      followingNumber = following.length;
    } else {
      followersNumber = 'loading';
      followingNumber = 'loading';
    }

    return (
      <div>
        <div className="container-fluid ah-container">
          <div>
            <div className="col-9 mx-auto lp-intro">
              <Loader loaded={!loading}>
                <div className="row profile-header ah-container">
                  <div className="col-4">
                    <img className="img-thumbnail profile-image" src={profileImage} alt="avatar" />
                  </div>
                  <div className="col-6 top-buffer">
                    <div className="row">
                      <div className="col-12">
                        <h3 className="profile-username">{ username }</h3>
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
                    { bio }
                  </p>
                </div>
              </Loader>
            </div>
          </div>
          <div>
            {Object.keys(userArticlesPayload).length > 0
              && <ArticlesList articles={userArticlesPayload.article} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profilePayload: state.user.profilePayload,
  isLoggedIn: state.user.isLoggedIn,
  userArticlesPayload: state.article.userArticlesPayload,
  loading: state.user.loading,
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getProfile,
  fetchUserArticles,
}, dispatch);

Profile.propTypes = {
  profilePayload: PropTypes.object,
  getProfile: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  userArticlesPayload: PropTypes.object.isRequired,
  fetchUserArticles: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  profilePayload: {},
  isLoggedIn: true,
};

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
