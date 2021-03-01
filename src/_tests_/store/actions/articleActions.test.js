import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';

import * as actions from "../../../store/actions/articleActions"
import * as types from "../../../store/constants/articelTypes"
import { SET_DAILY_ARTICLES } from  "../../../store/constants/newsAPITypes"
import { dummyArticles,dailyArticles } from '../../../store/dummyArticles';
import mockAxios from 'axios'


const mockStore = configureMockStore([thunk])

describe("articleActions", () => {
	let store;


	beforeEach(() =>{
		const mockState = {
			articleReducer:{
				savedArticles: dummyArticles,
				dailyArticles: dailyArticles},
			userReducer:{
				userName: 'someUser',
				jwtToken: 'someToken'
			}
		}

		store = mockStore(mockState)
		store.clearActions();
	
		mockAxios.mockClear()

		const getItemSpy = jest.spyOn(global.localStorage, "getItem").mockImplementation().mockReturnValue(null)

	})

	describe("getUserArticles", () => {
		it("should dispatch loadUserArticles", () => {
			mockAxios.get.mockImplementationOnce(() => Promise.resolve({
				data: {} }))

			let expectedAction =[{type: types.IS_LOADING_ARTICELS}]

			store.dispatch(actions.getUserArticles())
			expect(store.getActions()).toEqual(expectedAction)

		})

		it("should dispatch getUserArticelsSuccessfull", () => {
			mockAxios.get.mockImplementationOnce(() => Promise.resolve({
				data: dummyArticles }))

			 return store.dispatch(actions.getUserArticles()).then(()=>{
				let expectedAction =[{
					type: types.IS_LOADING_ARTICELS
				},
				{
					type: types.GET_USER_ARTICELS_SUCCESSFUL,
					payload: dummyArticles
				}
			]
			expect(store.getActions()).toEqual(expectedAction)
			})
		})

		it("should dispatch getUserArticleError", () => {
			mockAxios.get.mockImplementationOnce(() => Promise.reject({
				response: {data: {
					"status": 400,
					"message": "some error",
			}}}))


		return store.dispatch(actions.getUserArticles()).then(() =>{
				let expectedAction =[{
					type: types.IS_LOADING_ARTICELS
				},
				{
					type: types.GET_USER_ARTICELS_ERROR,
					payload: "some error"
				}
			]

			expect(store.getActions()).toEqual(expectedAction)
			})
		})

	})

	
	describe("setBookmarkInDailyArticles", ()=>{
		it("should dispatch setDailyArticles", ()=>{
			const article = dailyArticles[0]

			expect(dailyArticles[0].isBookmarked).toBeFalsy()

			const getItemSpy = jest.spyOn(global.localStorage, 'getItem').mockImplementationOnce().mockReturnValueOnce('[]')
			const setItemSpy = jest.spyOn(global.localStorage, 'setItem')


			article.isBookmarked = true
			store.dispatch(actions.setBookmarkInDailyArticles(article))
			
			expect(dailyArticles[0].isBookmarked).toEqual(true)

			expect(getItemSpy).toHaveBeenCalledWith("bookmarkedArticles")
			expect(setItemSpy).toHaveBeenCalled()

			let expectedAction = [{
				type: SET_DAILY_ARTICLES,
				payload: dailyArticles
			}]

			expect(store.getActions()).toEqual(expectedAction)

		})

	})

	describe("saveUserArticle", () => {
		it("should dispatch addArticle and setBookmarkInDailyArticles", async () =>{
			const article = {id: 15, 
				title:"someerercwee article", 
				description: "some description", 
				url: "someUrl", 
				urlToImage: "url to image", 
				source: "name to source", 
				isBookmarked: true
			}

			const expectedArticles = [dailyArticles[0], article]

			mockAxios.post.mockImplementationOnce(() => Promise.resolve({data: article}))

			const expectedAction = [
				{
					type: types.ADD_ARTICLE_TO_SAVED_ARTICLELIST,
					payload: article
				},
				{type: SET_DAILY_ARTICLES,
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
				{type: types.GET_USER_ARTICELS_ERROR,
					payload: "some error message"
				}
			]

			await store.dispatch(actions.saveUserArticle(article)).then(() =>{
				expect(store.getActions()).toEqual(expectedAction)
			})
		})
	
	})

	describe("deleteArticleInDB", () => {
		it('should dispatch removeBookmarkInDailyArticles and getUserArticles when deleted succesfully', async () => {
			const article = dailyArticles[0]
			
			mockAxios.delete.mockImplementationOnce(() => Promise.resolve({response:{ data: "someData"}}))
			mockAxios.get.mockImplementationOnce(()=> Promise.resolve({data:article}))
			// const consoleSpy = jest.spyOn(global.console, 'log')
			// const spy = jest.spyOn(actions, "removeBookmarkInDailyArticles")

			let expectedAction = [
			{
				type: SET_DAILY_ARTICLES,
				payload: dailyArticles
			},{	type: types.IS_LOADING_ARTICELS},
			{
				type:types.GET_USER_ARTICELS_SUCCESSFUL,
				payload: article
			}
		
		]

			await store.dispatch(actions.deleteArticleInDB(article)).then(()=>{
				// expect(consoleSpy).toHaveBeenCalledWith(article)
				expect(store.getActions()).toEqual(expectedAction)
			})

		})

		it("should dispatch getUserArticlesError", async() =>{

			mockAxios.delete.mockImplementationOnce(()=> Promise.reject({
				response:{data:{
					message:"error message"
				}}
			}))

			const expectedAction = [
				{type: types.GET_USER_ARTICELS_ERROR,
				payload: "error message"}
			]
			await store.dispatch(actions.deleteArticleInDB(dailyArticles[0])).then(() => {
				expect(store.getActions()).toEqual(expectedAction)
			}
			)

		})

	})
})
