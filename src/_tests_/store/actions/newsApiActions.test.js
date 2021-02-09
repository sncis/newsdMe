import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';	
import axios from 'axios'

import * as actions from "../../../store/actions/newsApiActions"
import {IS_LOADING_ARTICELS,
SET_DAILY_ARTICLES_ERROR,
SET_DAILY_ARTICLES} from "../../../store/constants/articelTypes"

import { NEWS_API_KEY } from "../../../keys"

const mockStore = configureMockStore([thunk])
const mock = new MockAdapter(axios)

describe("newsApiActions", () => {
	let store;
	let dailyArticles

	beforeEach(()=>{
		jest.resetModules()
		jest.resetAllMocks()
		dailyArticles  = require("../../../store/dummyArticles")


		const mockState = {articleReducer:{
			dailyArticles: dailyArticles.dailyArticles},
		}

		store = mockStore(mockState)
		store.clearActions();
	})
	


	describe("loadDeailyArticles", ()=>{
		it("should dispatch isLaodingDailyArticles and setDailyArticles", ()=>{
			mock.onGet(`https://newsapi.org/v2/top-headlines?country=de&apiKey=${NEWS_API_KEY}`).reply(200, dailyArticles.dailyArticles)

			return store.dispatch(actions.loadDailyArticles()).then(() => {
				let expectedAction=[{
					type: IS_LOADING_ARTICELS
				},{
					type: SET_DAILY_ARTICLES,
					payload: dailyArticles.dailyArticles
				}]
				expect(store.getActions()).toEqual(expectedAction)
			})

		})

		it("should dispatch setDeailyArticlesError", () => {
			mock.onGet(`https://newsapi.org/v2/top-headlines?country=de&apiKey=${NEWS_API_KEY}`).reply(400, 'some error')
	
		
			return store.dispatch(actions.loadDailyArticles()).then(() => {
				let expectedAction =[{
					type: IS_LOADING_ARTICELS
				},{
					type: SET_DAILY_ARTICLES_ERROR,
					payload: 'some error'
				}]
				expect(store.getActions()).toEqual(expectedAction)

			})

		})
	})
	describe('bookmarkResponse', ()=>{
		it("should bookmark the response if they are in local storage", ()=> {
			const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem')
			getItemSpy.mockImplementation(() => JSON.stringify(dailyArticles.dailyArticles))

			const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem')

			expect(dailyArticles.dailyArticles[0].isBookmarked).toBeFalsy()

			store.dispatch(actions.bookmarkResponse(dailyArticles.dailyArticles))

			expect(getItemSpy).toHaveBeenCalledWith("bookmarkedArticles")
			expect(dailyArticles.dailyArticles[0].isBookmarked).toBeTruthy()
		})

		it("shoudl not bookmark articels if no articles in local storage", () => {

			const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem')
			getItemSpy.mockImplementation(() => JSON.stringify([]))

			const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem')

			expect(dailyArticles.dailyArticles[1].isBookmarked).toBeFalsy()

			store.dispatch(actions.bookmarkResponse(dailyArticles.dailyArticles))

			expect(dailyArticles.dailyArticles[1].isBookmarked).toBeFalsy()
		})
	})
})