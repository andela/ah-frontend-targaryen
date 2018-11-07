import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchArticles } from '../../actions/articleActions';
import ArticlesList from './ArticlesList';

class Articles extends Component {
  componentDidMount() {
    this.props.fetchArticles();
  }

  // componentWillReceiveProps(nextProps){
  //   // console.log(nextProps)
  // }
  render() {
    const { articlesPayload } = this.props;
    const articles = articlesPayload;
    return (
      <div>
        <h1>Articles</h1>
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
