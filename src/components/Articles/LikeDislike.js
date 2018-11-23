import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { likeDislike } from '../../actions/articleActions';


export class Reactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      disliked: false,
    };
  }

  handleClick = event => {
    event.preventDefault();
    const payload = { reaction: event.target.value };
    const {
      likeDislike,
      slug,
      isLoggedIn,
      history,
    } = this.props;
    isLoggedIn ? likeDislike(payload, slug) : history.push('login');

    if (payload.reaction === 'Like') {
      this.setState({
        liked: true,
      });
      setTimeout(() => {
        this.setState({
          liked: false,
        });
      }, 400);
    }
    if (payload.reaction === 'Dislike') {
      this.setState({
        disliked: true,
      });
      setTimeout(() => {
        this.setState({
          disliked: false,
        });
      }, 400);
    }
  }

  render() {
    const {
      liked,
      disliked,
    } = this.state;
    const likefill = liked ? { hightlight: 'reaction icon far fa fa-thumbs-up' } : { hightlight: 'reaction icon far fa-thumbs-up' };
    const dislikefill = disliked ? { hightlight: 'reaction icon far fa fa-thumbs-down' } : { hightlight: 'reaction icon far fa-thumbs-down' };
    return (
      <React.Fragment>
        <button type="button" className={likefill.hightlight} value="Like" onClick={this.handleClick} />
        <button type="button" className={dislikefill.hightlight} value="Dislike" onClick={this.handleClick} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  loading: state.user.loading,
});

const matchDispatchToProps = (dispatch) => bindActionCreators({
  likeDislike,
}, dispatch);

Reactions.propTypes = {
  slug: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  likeDislike: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Reactions);
