import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postArticle } from '../../actions/articleActions';

export class NewArticle extends Component {
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
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createArticleSuccess === true) {
      const { history } = this.props;
      history.push('/dashboard');
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { title, description, body } = this.state;
    const payload = {
      article: {
        title,
        description,
        body,
      },
    };
    const { addArticle } = this.props;
    addArticle(payload);
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      body: '',
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEditorChange = value => {
    this.setState({ body: value });
  };

  render() {
    const { title, description, body } = this.state;
    const { loading } = this.props;
    return (
      <div
        className="container-fluid ah-container"
        style={{ paddingTop: '50px' }}
      >
        <div className="row">
          <Loader loaded={!loading}>
            <div className="col-12">
              <form id="add-article-form" onSubmit={this.handleSubmit}>
                <div className="container col-sm-12 col-md-8">
                  <div className="form-group mt-2">
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        name="title"
                        className="clear-box very-big-font"
                        placeholder="Title..."
                        id="title"
                        value={title}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        name="description"
                        className="clear-box bigger-font"
                        placeholder="Description..."
                        id="description"
                        value={description}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="text-editor">
                      <div>
                        <ReactQuill
                          id="text-editor"
                          modules={this.editorModules}
                          theme="snow"
                          className="quill-height"
                          value={body}
                          onChange={this.handleEditorChange}
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
                          onClick={this.resetForm}
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
  }
}

NewArticle.propTypes = {
  addArticle: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  createArticleSuccess: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
};

NewArticle.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  articlesPayload: state.article.articlesPayload,
  createArticleSuccess: state.article.createArticleSuccess,
  loading: state.article.loading,
});

export default connect(
  mapStateToProps,
  { addArticle: postArticle },
)(NewArticle);
