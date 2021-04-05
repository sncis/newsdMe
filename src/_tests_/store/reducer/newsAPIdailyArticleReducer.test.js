import * as types from "../../../store/types/newsAPIdailyArticleTypes"
import { SET_DAILY_ARTICLES_SUCCESS, SET_DAILY_ARTICLES_ERROR } from "../../../store/types/newsAPIdailyArticleTypes"
import { dummyArticles } from "../../../store/dummyArticles"
import newsAPIdailyArticleReducer from "../../../store/reducers/newsAPIdailyArticleReducer"

describe("dailyArticleReducer", () =>{

	const initialState= {
		isLoading:false,
		articles: [],
		errorMsg:''
	}


	it("should return initial state", () => {
		const action = {type: ''}
		expect(newsAPIdailyArticleReducer(undefined, action)).toEqual(initialState)
	})

	it("should handle IS_LOADING_ARTICLES", () =>{
		const action = {type: types.IS_LOADING_ARTICLES}
		expect(newsAPIdailyArticleReducer(undefined,action)).toEqual({
			isLoading: true,
			articles: [],	
			errorMsg:''

		})
	})

	it("should handle SET_DAILY_ARTICLES_SUCCESS", () =>{
		const action = {type: SET_DAILY_ARTICLES_SUCCESS, payload: dummyArticles}

		expect(newsAPIdailyArticleReducer(undefined,action)).toEqual({
			isLoading: false,
			articles: dummyArticles,
			errorMsg:'',	
		})
	})

	it("should handle SET_DAILY_ARTICLES_ERROR", () =>{
		const action ={type: SET_DAILY_ARTICLES_ERROR, payload: 'some new error'}

		expect(newsAPIdailyArticleReducer(undefined, action)).toEqual({
			isLoading: false,
			errorMsg: "some new error",
			articles: [],
		})
	})

})