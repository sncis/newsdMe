import { LOAD_USER_ARTICELS, 
	GET_USER_ARTICELS_ERROR, 
	GET_USER_ARTICELS_SUCCESSFUL,
	SET_BOOKMARK,
	SET_UNBOOKMARK
} from "../constants/articelTypes"
import { dummyArticles } from "../dummyArticles";

const initialState = {
	isLoading:false,
	articles: dummyArticles
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
				articles: action.payload
			}
		case GET_USER_ARTICELS_ERROR:
			return{
				...state,
				isLoading: false,
				errorMsg: action.payload
			}
		case SET_BOOKMARK:	
			return{
				...state,
				articles: action.payload
			}
		case SET_UNBOOKMARK:	
			return{
				...state,
				articles: action.payload

			}
		default:
			return state;
	}
}

export default articleReducer;

