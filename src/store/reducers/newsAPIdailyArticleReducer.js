import { IS_LOADING_ARTICLES,
	SET_DAILY_ARTICLES_ERROR,
	SET_DAILY_ARTICLES_SUCCESS } from "../types/newsAPIdailyArticleTypes"

const initialState = {
	isLoading:false,
	articles: [],
}

const newsAPIdailyArticleReducer = (state=initialState, action='') => {
	switch(action.type){
		case IS_LOADING_ARTICLES:
			return{
				...state,
				isLoading: true
			}
		
		case SET_DAILY_ARTICLES_SUCCESS:
			return{
				...state,
				isLoading: false,
				articles: action.payload
			}
		case SET_DAILY_ARTICLES_ERROR:
			return{
				...state,
				errorMsg: action.payload,
				isLoading: false,
			}
		default:
			return state;
	}
}

export default newsAPIdailyArticleReducer;

