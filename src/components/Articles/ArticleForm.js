import React from 'react';
import Loader from 'react-loader';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ArticleForm = ({
  handleSubmit,
  resetForm,
  handleChange,
  handleEditorChange,
  title,
  description,
  body,
  loading,

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  },

}) => (
  <div
    className="container-fluid ah-container"
    style={{ paddingTop: '50px' }}
  >
    <div className="row">
      <Loader loaded={!loading}>
        <div className="col-12">
          <form id="add-article-form" onSubmit={handleSubmit}>
            <div className="container col-sm-12 col-md-8">
              <div className="form-group mt-2">
                <div className="input-group mb-2">
                  <input
                    type="text"
                    name="title"
                    className="clear-box article-view-title"
                    placeholder="Title..."
                    id="title"
                    value={title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-2">
                  <input
                    type="text"
                    name="description"
                    className="clear-box article-view-description"
                    placeholder="Description..."
                    id="description"
                    value={description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="text-editor">
                  <div>
                    <ReactQuill
                      id="text-editor"
                      modules={editorModules}
                      theme="snow"
                      className="quill-height article-body"
                      value={body}
                      onChange={handleEditorChange}
                      placeholder="Add the body here..."
                      required
                    />
                  </div>
                  <div className="m-t-10">
                    <button type="submit" className="btn ah-btn m-r-10">
                      Save
                    </button>
                    <button
                      type="button"
                      id="clear-button"
                      className="btn btn-outline-warning m-r-10"
                      onClick={resetForm}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Loader>
    </div>
  </div>
);

ArticleForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleEditorChange: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  editorModules: PropTypes.object.isRequired,
};

export default ArticleForm;
