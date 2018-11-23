import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';
import { rateSuccess } from '../../actions/actionCreators';
import { rate, fetchSpecificArticle } from '../../actions/articleActions';


export class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      redirect: false,
    };
  }

  componentDidMount() {
    const { article: { rating } } = this.props;
    this.setState({
      rating,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { article: { rating } } = this.props;
    if (nextProps.rateSuccessful === true) {
      const {
        rateSuccess,
      } = this.props;
      rateSuccess(false);
    }

    // Update rating displayed
    if (nextProps.article.rating !== rating) {
      this.setState({
        rating: nextProps.article.rating,
      });
    }
  }

  ratingChanged = (newRating) => {
    const payload = { rate: newRating };
    const {
      slug,
      isLoggedIn,
      rateArticle,
      specificArticle,
    } = this.props;
    if (isLoggedIn) {
      rateArticle(payload, slug);
      return this.setState({
        rating: specificArticle.article.rating,
      });
    }
    toast.warn('Please login first', { autoClose: 4500, hideProgressBar: true });
    return this.setState({
      redirect: true,
    });
  };

  render() {
    const { rating, redirect } = this.state;
    if (redirect) {
      const to = { pathname: '/login' };
      return (<Redirect exact to={to} />);
    }
    return (
      <ReactStars
        count={5}
        onChange={this.ratingChanged}
        size={24}
        half={false}
        value={parseInt(rating, 10)}
        className="rating"
        color1="#24292e"
        color2="#ffd700"
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  rateSuccessful: state.article.rateSuccessful,
  specificArticle: state.article.articlePayload,
});

const matchDispatchToProps = (dispatch) => bindActionCreators({
  rateArticle: rate,
  fetchSpecificArticle,
  rateSuccess,
}, dispatch);

Rate.contextTypes = {
  router: PropTypes.object,
};

Rate.propTypes = {
  slug: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  rateSuccessful: PropTypes.bool.isRequired,
  rateSuccess: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  specificArticle: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Rate);
