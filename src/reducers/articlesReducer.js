import { GET_ALL_ARTICLES_SUCCESS } from '../actions/types';

const initialState = {
  loading: false,
  articlesPayload: {},
};

const articleReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_ALL_ARTICLES_SUCCESS:
      return {
        ...state,
        articlesPayload: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
