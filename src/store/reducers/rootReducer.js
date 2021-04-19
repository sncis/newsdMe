import { combineReducers } from 'redux';
import  userReducer from './userReducer';
import  userArticleReducer from './userArticleReducer';
import newsAPIdailyArticleReducer from './newsAPIdailyArticleReducer';
import newsAPIsearchReducer from './newsAPIsearchReducer';
import newsApiArticleReducer from "./newsApiArticleReducer"

const rootReducer = combineReducers({
  userReducer,
  userArticleReducer,
  newsAPIdailyArticleReducer,
  newsAPIsearchReducer,
  newsApiArticleReducer
});

export default rootReducer;