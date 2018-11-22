import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import {
  fetchSpecificArticle,
  updateArticle,
} from '../../actions/articleActions';
import Article from './Article';
import ArticleForm from './ArticleForm';

export class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: '',
      isEditing: false,
      redirect: false,
    };
  }

  componentDidMount() {
    const { match: { params: { slug } }, fetchSpecificArticle } = this.props;
    fetchSpecificArticle(slug);
  }

  componentWillReceiveProps(nextProps) {
    const { editArticleSuccess, confirmDelete } = nextProps;
    const { articlePayload } = this.props;
    if (nextProps.articlePayload !== articlePayload) {
      const { article: { title, body, description } } = nextProps.articlePayload;
      this.setState({ title, body, description });
    }
    if (editArticleSuccess === true) {
      this.setState({ isEditing: false });
      const { history } = this.props;
      history.push('/dashboard');
    }
    if (confirmDelete) {
      this.setState({
        redirect: true,
      });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEditorChange = value => {
    this.setState({ body: value });
  };

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

    const { updateArticle } = this.props;
    const {
      match: {
        params: { slug },
      },
    } = this.props;
    updateArticle(slug, payload);
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      body: '',
    });
  };

  toggleEdit = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  render() {
    const {
      title,
      description,
      body,
      isEditing,
      redirect,
    } = this.state;
    const {
      loading,
      articlePayload,
      articlePayload: { article },
      match: { params: { slug } },
    } = this.props;
    if (isEditing) {
      return (
        <ArticleForm
          handleChange={this.handleChange}
          handleEditorChange={this.handleEditorChange}
          handleSubmit={this.handleSubmit}
          resetForm={this.resetForm}
          title={title}
          description={description}
          body={body}
          loading={loading}
        />
      );
    }
    if (redirect) {
      const to = { pathname: '/dashboard' };
      return (
        <Redirect to={to} />
      );
    }
    return (
      <div>
        <Loader loaded={!loading}>
          {Object.keys(articlePayload).length > 0
            && (<Article
              article={article}
              toggleEdit={this.toggleEdit}
              loading={loading}
              slug={slug}
            />
            )
          }
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articlePayload: state.article.articlePayload,
  editArticleSuccess: state.article.editArticleSuccess,
  loading: state.article.loading,
  confirmDelete: state.article.confirmDelete,
});

const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSpecificArticle,
      updateArticle,
    },
    dispatch,
  );

EditArticle.defaultProps = {
  loading: false,
};

EditArticle.propTypes = {
  fetchSpecificArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  articlePayload: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  editArticleSuccess: PropTypes.bool.isRequired,
  confirmDelete: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(EditArticle);
