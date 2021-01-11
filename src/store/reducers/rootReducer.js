import { combineReducers } from 'redux';
import  userReducer from './userReducer';
import  articleReducer from './articleReducer';

const rootReducer = combineReducers({
  userReducer,
  articleReducer
});

export default rootReducer;