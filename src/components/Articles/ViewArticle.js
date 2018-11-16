import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSpecificArticle } from '../../actions/articleActions';
import ReadArticle from './ReadArticle';

export class ViewArticle extends Component {
  componentDidMount() {
    const { match: { params: { slug } }, fetchSpecificArticle } = this.props;
    fetchSpecificArticle(slug);
  }

  render() {
    const { articlePayload, articlePayload: { article } } = this.props;

    return (
      <div>
        {Object.keys(articlePayload).length > 0
          && <ReadArticle article={article} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articlePayload: state.article.articlePayload,
});

const matchDispatchToProps = dispatch => bindActionCreators({
  fetchSpecificArticle,
}, dispatch);

ViewArticle.propTypes = {
  fetchSpecificArticle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  articlePayload: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(ViewArticle);
