import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CreateCommentForm = ({
  onSubmit,
  onChange,
  onClick,
  body,
}) => (
  <div className="container quill-container" style={{ paddingTop: '20px' }}>
    <div className="row">
      <div className="col-12">
        <form id="add-comment-form" onSubmit={onSubmit}>
          <div className="container">
            <div className="form-group">
              <div className="text-editor">
                <div className="quill-div">
                  <ReactQuill
                    id="text-editor"
                    theme=""
                    placeholder="Please add a comment"
                    className="quill-height-comments"
                    value={body}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
            </div>
            <button id="comment-submit-button" type="submit" className="btn btn-outline-primary m-r-10">Save</button>
            <button type="button" id="clear-button" className="btn btn-outline-warning m-r-10" onClick={onClick}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

CreateCommentForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CreateCommentForm;
