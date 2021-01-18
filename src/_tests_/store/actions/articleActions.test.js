import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';	

import * as actions from "../../../store/actions/articleActions"
import * as types from "../../../store/constants/articelTypes"
import { dummyArticles } from '../../../store/dummyArticles';
import axios from 'axios';

const mockStore = configureMockStore([thunk])
const mock = new MockAdapter(axios)


describe("articleActions", () => {
	let store;

	beforeEach(() =>{
		store = mockStore({username: "someUser",jwtToken: "someToken", articles: dummyArticles})

		store.clearActions();
	})

	describe("getUserArticles", () => {
		it("should dispatch loadUserArticles", () => {
			let expectedAction =[{type: types.LOAD_USER_ARTICELS}]

			store.dispatch(actions.getUserArticles(store.username))
			expect(store.getActions()).toEqual(expectedAction)

		})

		it("should dispatch getUserArticelsSuccessfull", () => {
			mock.onGet("http://localhost:8080/dashboard/articles?user=someUser").reply(200, dummyArticles)

			return store.dispatch(actions.getUserArticles()).then(()=>{
				let expectedAction =[{
					type: types.LOAD_USER_ARTICELS
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
			mock.onGet("http://localhost:8080/dashboard/articles?user=someUser").reply(400, {message: "article loading error"})

			return store.dispatch(actions.getUserArticles()).then(() =>{
				let expectedAction =[{
					type: types.LOAD_USER_ARTICELS
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

	describe("bookmark", () => {
		it("should dispatch setBookmark", () =>{
			const article = dummyArticles[0]
			
			let expectedAction =[{
				type:types.SET_BOOKMARK,
				payload: dummyArticles
			}]

			store.dispatch(actions.bookmark(article))
			expect(store.getActions()).toEqual(expectedAction)
		})

		it("should set isBookmarked to true", () => {
			const article = dummyArticles[0]
			store.dispatch(actions.bookmark(article))
			expect(article.isBookmarked).toEqual(true)
		})

	})

	describe("unBookmark", () =>{
		it("should dispatch setUnbookmark", () =>{
			const article = dummyArticles[0]
			
			let expectedAction =[{
				type:types.SET_UNBOOKMARK,
				payload: dummyArticles
			}]

			store.dispatch(actions.unBookmark(article))
			expect(store.getActions()).toEqual(expectedAction)
		})
		it("should set isBookmarked to true", () => {
			const article = dummyArticles[0]
			article.isBookmarked = true
			store.dispatch(actions.unBookmark(article))
			expect(article.isBookmarked).toEqual(false)
		})
	})
})