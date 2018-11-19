import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import CreateCommentForm from './CreateCommentForm';
import CommentList from './CommentList';
import { fetchComments, addComment } from '../../actions/articleActions';

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { article },
      },
    } = this.props;
    const { fetchComments } = this.props;
    fetchComments(article);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addCommentSuccess === true) {
      window.location.reload();
    }
    if (nextProps.isLoggedIn === false) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      match: {
        params: { article },
      },
    } = this.props;
    const { body } = this.state;
    const payload = {
      comment: {
        body,
      },
    };
    const { addComment } = this.props;
    addComment(payload, article);
  }

  resetForm = () => {
    this.setState({
      body: '',
    });
  };

  handleEditorChange = (value) => {
    this.setState({ body: value });
  }

  render() {
    const { body } = this.state;
    const {
      match: {
        params: { article },
      },
      loading, commentsPayload,
    } = this.props;
    return (
      <div>
        <div className="row comment-title">
          <h3>
            {`Comments for ${article}`}
          </h3>
        </div>
        <CreateCommentForm
          onSubmit={this.handleSubmit}
          onChange={this.handleEditorChange}
          onClick={this.resetForm}
          body={body}
        />
        <Loader loaded={!loading}>
          {Object.keys(commentsPayload).length > 0
            && <CommentList comments={commentsPayload.comments} />
          }
        </Loader>
      </div>
    );
  }
}

const matchDispatchToProps = (dispatch) => bindActionCreators({
  fetchComments,
  addComment,
}, dispatch);

const mapStateToProps = (state) => ({
  commentsPayload: state.article.commentsPayload,
  addCommentSuccess: state.article.addCommentSuccess,
  isLoggedIn: state.user.isLoggedIn,
  loading: state.user.loading,
});

Comments.propTypes = {
  addComment: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetchComments: PropTypes.func.isRequired,
  commentsPayload: PropTypes.object.isRequired,
  addCommentSuccess: PropTypes.bool,
  loading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

Comments.defaultProps = {
  addCommentSuccess: false,
  loading: false,
  isLoggedIn: true,
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Comments);
