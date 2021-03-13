import { combineReducers } from 'redux';
import  userReducer from './userReducer';
import  userArticleReducer from './userArticleReducer';
import newsAPIdailyArticleReducer from './newsAPIdailyArticleReducer'
import newsAPIsearchReducer from './newsAPIsearchReducer'

const rootReducer = combineReducers({
  userReducer,
  userArticleReducer,
  newsAPIdailyArticleReducer,
  newsAPIsearchReducer 
});

export default rootReducer;