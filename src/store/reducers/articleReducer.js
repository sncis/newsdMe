import { LOAD_USER_ARTICELS, 
	GET_USER_ARTICELS_ERROR, 
	GET_USER_ARTICELS_SUCCESSFUL,
	SET_DAILY_ARTICLES,
	ADD_ARTICLE_TO_SAVED_ARTICLELIST,
} from "../constants/articelTypes"
import { dummyArticles, dailyArticles } from "../dummyArticles";

const initialState = {
	isLoading:false,
	savedArticles: dummyArticles,
	dailyArticles: dailyArticles
}

const articleReducer = (state=initialState, action='') => {
	switch(action.type){
		case LOAD_USER_ARTICELS:
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
				errorMsg: action.payload
			}
		case SET_DAILY_ARTICLES:	
			return{
				...state,
				dailyArticles: action.payload
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

