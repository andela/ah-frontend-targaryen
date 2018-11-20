import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { editComment } from '../../actions/articleActions';

export class UpdateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      modal: false,
      currentUser: '',
    };
  }

  componentWillMount = () => {
    const currentUser = localStorage.getItem('username');
    this.setState({ currentUser });
  }

  componentDidMount = () => {
    const { comment } = this.props;
    this.setState({ body: comment.body });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateCommentSuccess === true) {
      window.location.reload();
    }
    if (nextProps.isLoggedIn === false) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  handleChange = value => {
    this.setState({ body: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { editComment, slug, comment: { id } } = this.props;
    const { body, modal } = this.state;
    const payload = {
      comment: {
        body,
      },
    };
    editComment(payload, slug, id);
    this.setState({
      modal: !modal,
    });
  }

  getAuthor = author => {
    const { currentUser } = this.state;
    if (currentUser === author) {
      return 'modal-display';
    }
    return 'modal-no-display';
  };

  canEditBlock = author => {
    const { currentUser } = this.state;
    if (currentUser === author) {
      return 'can-edit';
    }
    return 'can-not-edit';
  };

  render() {
    const {
      body,
      modal,
    } = this.state;
    const {
      loading,
      className,
      buttonLabel,
      comment,
    } = this.props;
    return (
      <React.Fragment>
        <Loader loaded={!loading}>
          <i className="far fa-edit icon" onClick={this.toggle} role="button" tabIndex={0}>{buttonLabel}</i>
          <Modal isOpen={modal} toggle={this.toggle} className={className}>
            <div className={this.canEditBlock(comment.author_name)}>
              You are not the author of this comment
            </div>
            <div className={this.getAuthor(comment.author_name)}>
              <ModalHeader>Edit comment</ModalHeader>
              <ModalBody>
                <ReactQuill
                  id="text-editor"
                  theme=""
                  placeholder="Please add a comment"
                  className="quill-height-comments"
                  value={body}
                  onChange={this.handleChange}
                  required
                />
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-outline-primary m-r-10" onClick={this.handleSubmit}>Submit</button>
                <button type="button" className="btn btn-outline-warning m-r-10" onClick={this.toggle}>Close</button>
              </ModalFooter>
            </div>
          </Modal>
        </Loader>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  loading: state.user.loading,
  updateCommentSuccess: state.article.updateCommentSuccess,
});

const matchDispatchToProps = (dispatch) => bindActionCreators({
  editComment,
}, dispatch);

UpdateComment.propTypes = {
  updateCommentSuccess: PropTypes.bool,
  comment: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  editComment: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.object.isRequired,
};

UpdateComment.defaultProps = {
  updateCommentSuccess: false,
};

export default connect(mapStateToProps, matchDispatchToProps)(UpdateComment);
