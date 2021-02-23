import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';
// import MockAdapter from 'axios-mock-adapter';	
import mockAxios from 'axios'


import * as actions from "../../../store/actions/newsApiActions"
import {IS_LOADING_ARTICELS,
SET_DAILY_ARTICLES_ERROR,
SET_DAILY_ARTICLES} from "../../../store/constants/articelTypes"

import { NEWS_API_KEY } from "../../../keys"

const mockStore = configureMockStore([thunk])
// const mock = new MockAdapter(axios)

describe("newsApiActions", () => {
	let store;
	let dailyArticles

	beforeEach(()=>{
		// jest.resetModules()
		jest.restoreAllMocks()
		jest.clearAllMocks()
		dailyArticles  = require("../../../store/dummyArticles")


		const mockState = {articleReducer:{
			dailyArticles: dailyArticles.dailyArticles},
		}

		store = mockStore(mockState)
		store.clearActions();
		mockAxios.mockClear()

	})
	


	describe("loadDailyArticles", () => {
		it("should dispatch isLoadingDailyArticles and setDailyArticles", async ()=>{
			mockAxios.get.mockImplementationOnce(() => 
				Promise.resolve({data:{articles:dailyArticles.dailyArticles}}
			))
			const spy = jest.spyOn(window.localStorage, "getItem")
			spy.mockReturnValueOnce(null)

			let expectedAction=[{
						type: IS_LOADING_ARTICELS
					},{
						type: SET_DAILY_ARTICLES,
						payload: dailyArticles.dailyArticles
					}]

			await store.dispatch(actions.loadDailyArticles()).then(() => {
				
				expect(store.getActions()).toEqual(expectedAction)

			})

		})
		it("should dispatch setDalyArticlesError", async () =>{
			mockAxios.get.mockImplementationOnce(() => 
			Promise.reject({
				response:{
					data:"some error"
				}
			}))

			await store.dispatch(actions.loadDailyArticles()).then(()=>{
				let expectedAction =[{
					type: IS_LOADING_ARTICELS
				},{
					type: SET_DAILY_ARTICLES_ERROR,
					payload: "some error"
				}]

				expect(store.getActions()).toEqual(expectedAction)
			})
		})	
	})

	describe("bookmarkResponse", () =>{
		it("should replace fetched articles when article already in localStorage", () => {
			const article = [{id: 100, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: true}]

			const expectedArticles = [{id: 100, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: true},
						{id: 15, title:"someerercwee article", description: "some description", url: "someUrl", urlToImage: "url to image", source:{name: "name to source"}, isBookmarked: false}
		]
	
			const spy = jest.spyOn(global.localStorage, "getItem")
			spy.mockImplementationOnce().mockReturnValueOnce(JSON.stringify(article))

			const expectedAction = [{
				type: SET_DAILY_ARTICLES,
				payload: expectedArticles
			}]

			store.dispatch(actions.bookmarkResponse(dailyArticles.dailyArticles))

			expect(store.getActions()).toEqual(expectedAction)
			expect(spy).toHaveBeenCalled()
		})

		it("should setDailyArticles when no articles in localStorage", () => {
			const spy = jest.spyOn(global.localStorage, "getItem")
			spy.mockImplementationOnce().mockReturnValueOnce(null)

			const expectedAction = [{
				type: SET_DAILY_ARTICLES,
				payload: dailyArticles.dailyArticles
			}]

			store.dispatch(actions.bookmarkResponse(dailyArticles.dailyArticles))

			expect(store.getActions()).toEqual(expectedAction)
			expect(spy).toHaveBeenCalled()
		})
	})
})