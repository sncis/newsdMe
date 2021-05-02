import { LOAD_ARTICLE_SEARCH,
	ARTICLE_SEARCH_SUCCESS,
	ARTICLE_SEARCH_ERROR } from '../types/newsAPIsearchTypes'

const initialState ={
	isLoading:false,
	articles: [],
	isSearch: true
}
const newsAPIsearchReducer = (state= initialState, action='') => {
	switch(action.type){
		case LOAD_ARTICLE_SEARCH:
			return {
				...state,
				isLoading:true,
			};
			case ARTICLE_SEARCH_SUCCESS:
				return {
					...state,
					articles: action.payload
				};
				case ARTICLE_SEARCH_ERROR:
					return {
						...state,
						errorMsg: action.payload
					};
			default:
				return state

	}
}

export default newsAPIsearchReducer