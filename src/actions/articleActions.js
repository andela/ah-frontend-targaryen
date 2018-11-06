import axiosInstance from '../config/axiosInstance';
import { getAllArticles } from './actionCreators';

const fetchArticles = () => dispatch => {
  axiosInstance
    .get('/api/article/')
    .then((response) => {
      dispatch(getAllArticles(response.data.article));
    });
};

export default fetchArticles;
