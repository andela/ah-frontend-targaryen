import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import fetchArticles from '../../actions/articleActions';
import ArticlesList from './ArticlesList';

export class Articles extends Component {
  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles();
  }

  render() {
    const { articlesPayload } = this.props;
    const articles = articlesPayload;
    return (
      <div>
        {Object.keys(articles).length > 0
          && <ArticlesList articles={articles.results} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articlesPayload: state.article.articlesPayload,
});

const matchDispatchToProps = (dispatch) => bindActionCreators({
  fetchArticles,
}, dispatch);

Articles.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articlesPayload: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Articles);
