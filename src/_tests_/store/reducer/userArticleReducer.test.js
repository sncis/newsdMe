import * as types from "../../../store/constants/userArticelTypes"
import { dummyArticles } from "../../../store/dummyArticles"

import userArticleReducer from '../../../store/reducers/userArticleReducer'

describe("userArticleReducer", () =>{
	const initailState= {
		isLoading:false,
		articles: [],
	}
	it("should return initial state", () => {
		const action = {type: ''}
		expect(userArticleReducer(undefined, action)).toEqual(initailState)
	})
	it("should handle IS_LOADING_ARTICLES", () =>{
		const action = {type: types.IS_LOADING_ARTICLES}
		expect(userArticleReducer(undefined,action)).toEqual({
			isLoading: true,
			articles: [],
		})
	})
	it("should handle GET_USER_ARTICELS_SUCCESSFUL", () =>{
		const action = {type: types.GET_USER_ARTICLES_SUCCESS, payload:dummyArticles}

		expect(userArticleReducer(undefined,action)).toEqual({
			isLoading:false,
			articles: dummyArticles,
		})
	})
	it("should handle GET_USER_ARTICELS_ERROR", () => {
		const action = {type: types.GET_USER_ARTICLES_ERROR, payload: "some error"}

		expect(userArticleReducer(undefined,action)).toEqual({
			isLoading: false,
			articles: [],
			errorMsg: "some error"
		})
	})

})