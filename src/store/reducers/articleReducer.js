import { IS_LOADING_ARTICELS, 
	GET_USER_ARTICELS_ERROR, 
	GET_USER_ARTICELS_SUCCESSFUL,
	
	ADD_ARTICLE_TO_SAVED_ARTICLELIST,
} from "../constants/articelTypes"

import { SET_DAILY_ARTICLES_ERROR, SET_DAILY_ARTICLES } from "../constants/newsAPITypes"

const initialState = {
	isLoading:false,
	savedArticles: [],
	dailyArticles: []
}

const articleReducer = (state=initialState, action='') => {
	switch(action.type){
		case IS_LOADING_ARTICELS:
			return{
				...state,
				isLoading: true
			}
		case GET_USER_ARTICELS_SUCCESSFUL:
			return {
				...state,
				isLoading: false,
				savedArticles: action.payload
			}
		case GET_USER_ARTICELS_ERROR:
			return{
				...state,
				isLoading: false,
				savedArticlesErrorMsg: action.payload
			}
		case SET_DAILY_ARTICLES:	
			return{
				...state,
				isLoading: false,
				dailyArticles: action.payload
			}
		case SET_DAILY_ARTICLES_ERROR:
			return{
				...state,
				errorMsg: action.payload,
				isLoading: false,
			}
		case ADD_ARTICLE_TO_SAVED_ARTICLELIST:
			return{
				...state,
				savedArticles: [...state.savedArticles, action.payload]
			}
		default:
			return state;
	}
}

export default articleReducer;

