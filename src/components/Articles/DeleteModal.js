import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { deleteArticle } from '../../actions/articleActions';

export class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.confirmDelete) {
      this.setState({
        redirect: true,
      });
    }
  }

  handleClick = event => {
    event.preventDefault();
    const { slug, deleteArticle } = this.props;
    deleteArticle(slug);
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      const to = { pathname: '/dashboard' };
      return (
        <Redirect to={to} />
      );
    }
    return (
      <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this article?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn-delete" onClick={this.handleClick} data-dismiss="modal">Yes, delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  confirmDelete: state.article.confirmDelete,
});

const matchDispatchToProps = dispatch => bindActionCreators({
  deleteArticle,
}, dispatch);

DeleteModal.propTypes = {
  confirmDelete: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,

};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(DeleteModal);
