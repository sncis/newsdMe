import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';	

import * as actions from "../../../store/actions/articleActions"
import { setDailyArticles } from '../../../store/actions/newsApiActions'
import * as types from "../../../store/constants/articelTypes"
import { dummyArticles, dailyArticles } from '../../../store/dummyArticles';
import axios from 'axios';
import store from "../../../store/store/store"

const mockStore = configureMockStore([thunk])
const mock = new MockAdapter(axios)



jest.mock("../../../store/store/store")
// Storage.prototype.setItem = jest.fn().mockImplementation(()=> {
// 	return null
// })
// Storage.prototype.getItem = jest.fn().mockImplementation(() =>{
// 	return null
// })

// const getItemSpy = jest.spyOn(Storage.prototype, 'getItem')
// const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')




describe("articleActions", () => {
	let store;

	beforeEach(() =>{
		const mockState = {articleReducer:{
			savedArticles: dummyArticles,
			dailyArticles: dailyArticles},
			userReducer:{
			userName: 'someUser',
			jwtToken: 'someToken'
		}
	}

		store = mockStore(mockState)

		store.clearActions();
		jest.clearAllMocks()
	})

	describe("getUserArticles", () => {
		it("should dispatch loadUserArticles", () => {
			let expectedAction =[{type: types.IS_LOADING_ARTICELS}]

			store.dispatch(actions.getUserArticles())
			expect(store.getActions()).toEqual(expectedAction)

		})

		it("should dispatch getUserArticelsSuccessfull", () => {
			mock.onGet("http://localhost:8080/articles?username=someUser").reply(200, dummyArticles)

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
			mock.onGet("http://localhost:8080/articles?username=someUser").reply(400, {message: "article loading error"})

		return store.dispatch(actions.getUserArticles()).then(() =>{
				let expectedAction =[{
					type: types.IS_LOADING_ARTICELS
				},
				{
					type: types.GET_USER_ARTICELS_ERROR,
					payload: "article loading error"
				}
			]

			expect(store.getActions()).toEqual(expectedAction)
			})
		})

	})


	describe("saveUserArticle", () => {
	it("should dispatch setBookmarkInDailyArticles and addArticleToSavedArticleList", () => {
		
		mock.onPost("http://localhost:8080/articles?username=someUser").reply(200, dummyArticles)
		
		const article = dailyArticles[0]
	
		const newDailyArticles = dailyArticles.slice()
		newDailyArticles[0].isBookmarked = true

		let expectedAction=[{
			type: types.SET_DAILY_ARTICLES,
			payload: newDailyArticles
			},{
				type: types.ADD_ARTICLE_TO_SAVED_ARTICLELIST,
				payload: article
		}]

		store.dispatch(actions.saveUserArticle(article))
	
		expect(store.getActions()).toEqual(expectedAction)
		expect(dailyArticles[0].isBookmarked).toEqual(true)
		
		})

	})

	
	describe("setBookmarkInDailyArticles", ()=>{
		it("should dispatch setDailyArticles", ()=>{
			const article = dailyArticles[0]
			const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem')
			const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem')

			store.dispatch(actions.setBookmarkInDailyArticles(article.title, article.source.name))
			
			expect(dailyArticles[0].isBookmarked).toEqual(true)

			expect(getItemSpy).toHaveBeenCalledWith("bookmarkedArticles")
			expect(setItemSpy).toHaveBeenCalled()

			let expectedAction = [{
				type: types.SET_DAILY_ARTICLES,
				payload: dailyArticles
			}]

			expect(store.getActions()).toEqual(expectedAction)

		})

	})

	describe("storeArticleInDB", () =>{
		it("should dispatch getUserArticlesSuccesfull", () => {
			mock.onPost("http://localhost:8080/articles?username=someUser").reply(200, dummyArticles)

			return store.dispatch(actions.storeArticleInDB(dummyArticles[0])).then(() => {
				let expectedAction=[{
					type: types.GET_USER_ARTICELS_SUCCESSFUL,
					payload: dummyArticles
				}]
				expect(store.getActions()).toEqual(expectedAction)
			})

		})

		it("should dispatch getUserarticlesError", () => {
			mock.onPost("http://localhost:8080/articles?username=someUser").reply(400, {message: "no articles"})

			return store.dispatch(actions.storeArticleInDB(dummyArticles[0])).then(() => {
				let expectedAction =[{
					type: types.GET_USER_ARTICELS_ERROR,
					payload: "no articles"
				}]

				expect(store.getActions()).toEqual(expectedAction)
			})
		})
	})

	// describe("removeUserArticle", () =>{
	// 	it('should dispatch removeBookmarkInDailyArticles and deleteArticleFromArray', () => {
	// 		const title = dailyArticles[0].title
			
	// 		const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem')
	// 		// getItemSpy.mockImplementationOnce(() => JSON.stringify(dailyArticles[1]))

	// 		const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem')

			

	// 		mock.onDelete(`http://localhost:8080/articles/article?title=${title}`).reply(200, 'response')

	// 		const article = dailyArticles[0]
		
	// 		const savedArticles = store.getState().articleReducer.savedArticles

	// 		const articlesNotToDelete =[]
	// 		savedArticles.forEach(el => !title.includes(el.title) ? articlesNotToDelete.push(el) : null)
		
	// 		store.dispatch(actions.removeUserArticle(article))
	// 			let expectedActions =[{
	// 				type: types.SET_DAILY_ARTICLES,
	// 				payload: dailyArticles
	// 			}, 
	// 			{
	// 				type: types.GET_USER_ARTICELS_SUCCESSFUL,
	// 				payload: savedArticles

	// 			}]
	// 			expect(store.getActions()).toEqual(expectedActions)
	// 			expect(getItemSpy).toHaveBeenCalledWith("bookmarkedArticles")
	// 			expect(setItemSpy).toHaveBeenCalled()
	// 	})
	// })

	describe("deleteArticleinDB", () => {
		it('should console.log the response', () => {
			const title = "daily3 some third article"

			mock.onDelete(`http://localhost:8080/articles/article?title=${title}`).reply(200, 'Some response')
			const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation()

			return store.dispatch(actions.deleteArticleInDB(title, "some")).then(()=>{
				expect(consoleSpy).toHaveBeenCalledWith("Some response")	
			})
		})

		it("should console log error response", () => {
			const title = "daily3 some third article"

			mock.onDelete(`http://localhost:8080/articles/article?title=${title}`).reply(400, {message: "error response"})
			const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation()

			return store.dispatch(actions.deleteArticleInDB(title, "some")).then(()=>{
				expect(consoleSpy).toHaveBeenCalledWith("error response")	
			})
		})
	})
})

