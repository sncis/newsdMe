import { IS_LOADING_ARTICLES,
  FETCH_ARTICLES_SUCCEEDED,
  FETCH_ARTICLES_FAILED } from "../types/newsAPIdailyArticleTypes"

const initialState = {
  isLoading:false,
  articles: [],
  errorMsg:''
}

const newsApiArticleReducer = (state=initialState, action='') => {
  switch(action.type){
    case IS_LOADING_ARTICLES:
      return{
        ...state,
        isLoading: true
      }

    case FETCH_ARTICLES_SUCCEEDED:
      return{
        ...state,
        isLoading: false,
        articles: action.payload
      }
    case FETCH_ARTICLES_FAILED:
      return{
        ...state,
        errorMsg: action.payload,
        articles: [],
        isLoading: false,
      }
    default:
      return state;
  }
}

export default newsApiArticleReducer;

