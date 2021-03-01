import * as types from "../../../store/constants/articelTypes"
import { SET_DAILY_ARTICLES, SET_DAILY_ARTICLES_ERROR } from "../../../store/constants/newsAPITypes"
import { dummyArticles } from "../../../store/dummyArticles"
import articleReducer from "../../../store/reducers/articleReducer"

describe("articleReducer", () =>{

	const initailState= {
		isLoading:false,
		savedArticles: [],
		dailyArticles: []

	}


	it("should return initial state", () => {
		const action = {type: ''}
		expect(articleReducer(undefined, action)).toEqual(initailState)
	})

	it("should handle IS_LOADING_ARTICLES", () =>{
		const action = {type: types.IS_LOADING_ARTICELS}
		expect(articleReducer(undefined,action)).toEqual({
			isLoading: true,
			savedArticles: [],
			dailyArticles: []
		})
	})

	it("should handle GET_USER_ARTICELS_SUCCESSFUL", () =>{
		const action = {type: types.GET_USER_ARTICELS_SUCCESSFUL, payload:dummyArticles}

		expect(articleReducer(undefined,action)).toEqual({
			isLoading:false,
			savedArticles: dummyArticles,
			dailyArticles: []
		})
	})

	it("should handle GET_USER_ARTICELS_ERROR", () => {
		const action = {type: types.GET_USER_ARTICELS_ERROR, payload: "some error"}

		expect(articleReducer(undefined,action)).toEqual({
			isLoading: false,
			savedArticles: [],
			dailyArticles: [],
			savedArticlesErrorMsg: "some error"
		})
	})

	it("should handle SET_DAILY_ARTICLES", () =>{
		const action = {type: SET_DAILY_ARTICLES, payload: dummyArticles}

		expect(articleReducer(undefined,action)).toEqual({
			isLoading: false,
			savedArticles: [],
			dailyArticles: dummyArticles,
		})
	})

	it("should handle SET_DAILY_ARTICLES_ERROR", () =>{
		const action ={type: SET_DAILY_ARTICLES_ERROR, payload: 'some new error'}

		expect(articleReducer(undefined, action)).toEqual({
			isLoading: false,
			errorMsg: "some new error",
			savedArticles: [],
			dailyArticles: []
		})
	})

	it("should handle ADD_ARTICLE_TO_SAVED_ARTICLELIST", () => {
		const newArticle = 	{id: 30, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: false}

		const action = {type: types.ADD_ARTICLE_TO_SAVED_ARTICLELIST, payload: newArticle}

		expect(articleReducer(undefined,action)).toEqual({
			isLoading:false,
			dailyArticles: [],
			savedArticles: [newArticle]
		})
	})
})