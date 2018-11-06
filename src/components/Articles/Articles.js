import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchArticles } from '../../actions/articleActions';
import ArticlesList from './ArticlesList';

class Articles extends Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.fetchArticles();
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
  }
  
  render() {
    const articles = this.props.articlesPayload;
    // console.log(articles);

    // const isEmpty = (obj) => Object.keys(obj).length;
    // if (isEmpty(articles) === 0) {
    //   console.log('empty');
    // } else {
    //   console.log(articles.results);
    //   console.log(this.props.articlesPayload.results);
    // }
    return (
      <div>
        <h1>Articles</h1>
        {Object.keys(articles).length > 0
          && <ArticlesList articles={articles.results} />
        }
        {/* <ArticlesList {this.props.articlesPayload.results} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articlesPayload: state.article.articlesPayload,
});

const matchDispatchToProps = (dispatch) => bindActionCreators({
  fetchArticles,
}, dispatch,
);

Articles.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Articles);
