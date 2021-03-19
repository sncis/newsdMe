import * as types from '../../../store/types/newsAPIsearchTypes'
import newsAPIsearchReducer from '../../../store/reducers/newsAPIsearchReducer'
import { dummyArticles } from '../../../store/dummyArticles'


describe("searchReducer", () => {
	const initialState ={
		isLoading: false,
		isSearch: true,
		articles: []
	}

	it("should return initial state", () => {
		const action = {type: ''}
		expect(newsAPIsearchReducer(undefined, action)).toEqual(initialState)
	})

	it("should handle LOAD_ARTICLE_SEARCH", () =>{
		const action = {type: types.LOAD_ARTICLE_SEARCH}
		expect(newsAPIsearchReducer(undefined,action)).toEqual({
			isLoading: true,
			isSearch: true,
			articles: [],
		})
	})

	it("should return ARTICLE_SEARCH_SUCCESS", ()=>{
		const action = {type:types.ARTICLE_SEARCH_SUCCESS, payload: dummyArticles}
		expect(newsAPIsearchReducer(undefined,action)).toEqual({
			isLoading:false,
			isSearch: true,
			articles: dummyArticles
		})
	})

	it("should return ARTICLE_SEARCH_ERROR", ()=>{
		const action ={type: types.ARTICLE_SEARCH_ERROR, payload:'some loading error'}

		expect(newsAPIsearchReducer(undefined,action)).toEqual({
			isLoading:false,
			articles:[],
			isSearch: true,
			errorMsg: "some loading error"
		})
	})
})


