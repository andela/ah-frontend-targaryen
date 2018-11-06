import { combineReducers } from 'redux';
import userReducer from './userReducer';
import articlesReducer from './articlesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  article: articlesReducer,
});

export default rootReducer;
