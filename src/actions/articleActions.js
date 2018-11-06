// import { GET_ALL_ARTICLES } from './types';
import axiosInstance from '../config/axiosInstance';
import getAllArticles from './actionCreators';
import { GET_ALL_ARTICLES_SUCCESS } from './types';

export const fetchArticles = () => dispatch => {
  axiosInstance
  .get('/api/article/')
  .then((response) => {
    console.log(response);
    dispatch(getAllArticles(response.data.article));
  })
  .catch(() => {
    let errorMessage = {};

    
  }

  )
}
