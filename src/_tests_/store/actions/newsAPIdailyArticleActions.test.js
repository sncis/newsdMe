import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';
import mockAxios from 'axios'


import * as actions from "../../../store/actions/newsAPIdailyArticleActions"
import * as types from "../../../store/types/newsAPIdailyArticleTypes"

// import * as helpers from '../../../store/actions/articleActionHelpers'

const mockStore = configureMockStore([thunk])

describe("newsAPIArticleActions", () => {
	let store;
	let dailyArticles

	beforeEach(()=>{
		// jest.restoreAllMocks()
		// jest.clearAllMocks()
		dailyArticles  = require("../../../store/dummyArticles")

		store = mockStore({})
		store.clearActions();
		mockAxios.mockClear()
	})
	

	describe("loadDailyArticles", () => {
		it("should dispatch isLoadingDailyArticles and setDailyArticleswhen", async ()=>{
	
			mockAxios.get.mockImplementationOnce(() => 
				Promise.resolve({data:{articles:dailyArticles.dailyArticles}}
			))
			jest.spyOn(global.localStorage, "getItem")

			let expectedAction=[{
					type: types.IS_LOADING_ARTICLES
				},{
					type: types.SET_DAILY_ARTICLES_SUCCESS,
					payload: dailyArticles.dailyArticles
			}]

			await store.dispatch(actions.loadDailyArticles()).then(() => {
				expect(store.getActions()).toEqual(expectedAction)
			})
		})

		it("should dispatch setDailyArticlesError", async () =>{
			mockAxios.get.mockImplementationOnce(() => 
			Promise.reject({
				response:{
					data:"some error"
				}
			}))

			await store.dispatch(actions.loadDailyArticles()).then(()=>{
				let expectedAction =[{
					type: types.IS_LOADING_ARTICLES
				},{
					type: types.SET_DAILY_ARTICLES_ERROR,
					payload: "some error"
				}]

				expect(store.getActions()).toEqual(expectedAction)
			})
		})	
	})

	describe("bookmarkBookmarkedArticlesInAPIResponse", () => {
		it("should replace fetched articles when article already in localStorage", () => {
			const article = [{id: 100, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: true}]

			const expectedArticles = [
				{id: 100, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: true},
				{id: 15, title:"someerercwee article", description: "some description", url: "someUrl", urlToImage: "url to image", source:{name: "name to source"}, isBookmarked: false}
			]

			const spy = jest.spyOn(global.localStorage, "getItem")
			spy.mockImplementationOnce().mockReturnValueOnce(JSON.stringify(article))

			const expectedAction = [{
				type: types.SET_DAILY_ARTICLES_SUCCESS,
				payload: expectedArticles
			}]

			store.dispatch(actions.bookmarkBookmarkedArticlesInAPIResponse(dailyArticles.dailyArticles))
			expect(store.getActions()).toEqual(expectedAction)
			expect(spy).toHaveBeenCalled()
		})

		it("should setDailyArticles when no articles in localStorage", () => {
			const spy = jest.spyOn(global.localStorage, "getItem")
			spy.mockImplementationOnce(() => null)

			const expectedAction = [{
				type: types.SET_DAILY_ARTICLES_SUCCESS,
				payload: dailyArticles.dailyArticles
			}]

			store.dispatch(actions.bookmarkBookmarkedArticlesInAPIResponse(dailyArticles.dailyArticles))

			expect(store.getActions()).toEqual(expectedAction)
			expect(spy).toHaveBeenCalled()
		})
	})

	
})