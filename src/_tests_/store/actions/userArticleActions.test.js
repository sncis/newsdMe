import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';

import * as actions from "../../../store/actions/userArticleActions"
import * as types from "../../../store/types/userArticelTypes"
import { SET_DAILY_ARTICLES_SUCCESS } from  "../../../store/types/newsAPIdailyArticleTypes"
import { dummyArticles,dailyArticles } from '../../../store/dummyArticles';
import mockAxios from 'axios'
import * as helpers from "../../../store/actions/articleActionHelpers"

const mockStore = configureMockStore([thunk])


describe("userArticleActions", () => {
	let store;

	beforeEach(() =>{
		const mockState = {
			userArticleReducer:{
				articles: dummyArticles},
			newsAPIdailyArticleReducer:{
				articles: dailyArticles
			},
			userReducer:{
				userName: 'someUser',
				jwtToken: 'someToken'
			}
		}

		store = mockStore(mockState)
		store.clearActions();
		mockAxios.mockClear()
	})

	describe("getUserArticles", () => {
		beforeEach(()=>{
			jest.spyOn(global.localStorage, 'getItem').mockImplementationOnce(()=> null)

		})

		it("should dispatch loadUserArticles", () => {
			mockAxios.get.mockImplementationOnce(() => Promise.resolve({
				data: {} }))

			let expectedAction =[{type: types.IS_LOADING_ARTICLES}]

			store.dispatch(actions.getUserArticles())
			expect(store.getActions()).toEqual(expectedAction)

		})

		it("should dispatch getUserArticelsSuccessfull", async () => {
			mockAxios.get.mockImplementationOnce(() => Promise.resolve({
				data: dummyArticles }))

			let expectedAction =[{
				type: types.IS_LOADING_ARTICLES
			},
			{
				type: types.GET_USER_ARTICLES_SUCCESS,
				payload: dummyArticles
			}]

			await store.dispatch(actions.getUserArticles()).then(()=>{	
			expect(store.getActions()).toEqual(expectedAction)
			})
		})

		it("should dispatch getUserArticleError", async () => {
			mockAxios.get.mockImplementationOnce(() => Promise.reject({
				response: {data: {
					"status": 400,
					"message": "some error",
			}}}))

			let expectedAction =[{
				type: types.IS_LOADING_ARTICLES
			},
			{
				type: types.GET_USER_ARTICLES_ERROR,
				payload: "some error"
			}
		]

		await store.dispatch(actions.getUserArticles()).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
			})
		})

	})

	
	describe("setBookmarkInDailyArticles", ()=>{
		it("should dispatch setDailyArticlesSuccess", ()=>{

			const addArticleToLocalStorageSpy = jest.spyOn(helpers, "addArticleToLocalStorage").mockImplementationOnce(()=> jest.fn())
			const replaceArticleSpy = jest.spyOn(helpers, 'replaceArticleInArticlesArray').mockImplementationOnce(()=> dailyArticles)

			store.dispatch(actions.setBookmarkInDailyArticles(dailyArticles[0]))

			let expectedAction = [{
				type: SET_DAILY_ARTICLES_SUCCESS,
				payload: dailyArticles
			}]

			expect(store.getActions()).toEqual(expectedAction)
			expect(addArticleToLocalStorageSpy).toHaveBeenCalled()
			expect(replaceArticleSpy).toHaveBeenCalled()
		})

	})

	describe("saveUserArticle", () => {
		beforeEach(()=>{
			jest.spyOn(global.localStorage, 'getItem').mockImplementationOnce(()=> null)
		})

		it("should dispatch addArticleToUserArticleList and setBookmarkInDailyArticles", async () =>{
			const article = {id: 15, 
				title:"someerercwee article", 
				description: "some description", 
				url: "someUrl", 
				urlToImage: "url to image", 
				source: "name to source", 
				isBookmarked: true
			}

			const expectedArticles = [dailyArticles[0], article]
			jest.spyOn(helpers, "addArticleToLocalStorage")
			jest.spyOn(helpers, 'replaceArticleInArticlesArray').mockImplementationOnce(()=> expectedArticles)

			mockAxios.post.mockImplementationOnce(() => Promise.resolve({data: article}))

			let expectedAction = [
				{
					type: types.ADD_ARTICLE_TO_USER_ARTICLELIST,
					payload: article
				},
				{type: SET_DAILY_ARTICLES_SUCCESS,
				payload: expectedArticles}

			]

			await store.dispatch(actions.saveUserArticle(article)).then(()=>{
				expect(store.getActions()).toEqual(expectedAction)
			})
		})
	
		it("should dispatch getUserArtilcesError", async () =>{
			const article = { id: 15, 
				title: "someerercwee article", 
				description: "some description", 
				url: "someUrl", 
				urlToImage: "url to image", 
				source: "name to source", 
				isBookmarked: true
			}

			mockAxios.post.mockImplementationOnce(()=> Promise.reject({
				response:{
					data: {
						message:"some error message"
					}
				}
			}))

			let expectedAction=[
				{type: types.GET_USER_ARTICLES_ERROR,
					payload: "some error message"
				}
			]

			await store.dispatch(actions.saveUserArticle(article)).then(() =>{
				expect(store.getActions()).toEqual(expectedAction)
			})
		})
	
	})

	describe("deleteArticleInDB", () => {
		beforeEach(() =>{
			jest.spyOn(global.localStorage, 'getItem').mockImplementationOnce(()=> null)
		})
		
		it('should dispatch removeBookmarkInDailyArticles and getUserArticles when deleted succesfully', async () => {
			const article = dailyArticles[0]
			
			mockAxios.delete.mockImplementationOnce(() => Promise.resolve({response:{ data: "someData"}}))
			
			jest.spyOn(helpers, 'replaceArticleInArticlesArray').mockImplementationOnce(()=> dailyArticles)

			let expectedAction = [
			{
				type: SET_DAILY_ARTICLES_SUCCESS,
				payload: dailyArticles
			},{	
				type: types.IS_LOADING_ARTICLES}
		]

			await store.dispatch(actions.deleteArticleInDB(article)).then(()=>{
				expect(store.getActions()).toEqual(expectedAction)
			})

		})

		it("should dispatch getUserArticlesError", async() =>{

			mockAxios.delete.mockImplementationOnce(()=> Promise.reject({
				response:{data:{
					message:"error message"
				}}
			}))
			// jest.spyOn(global.localStorage, 'getItem').mockImplementationOnce(()=> null)

			const expectedAction = [
				{type: types.GET_USER_ARTICLES_ERROR,
				payload: "error message"}
			]
			await store.dispatch(actions.deleteArticleInDB(dailyArticles[0])).then(() => {
				expect(store.getActions()).toEqual(expectedAction)
			})
		})
	})
})
