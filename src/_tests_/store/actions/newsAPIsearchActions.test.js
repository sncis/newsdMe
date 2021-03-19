import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';
import * as types from '../../../store/types/newsAPIsearchTypes'
import * as actions from '../../../store/actions/newsAPIsearchActions'

import mockAxios from 'axios'

const mockStore = configureMockStore([thunk])

describe("newsAPIsearchActions", ()=>{
	let store;
	let dailyArticles
	
	beforeEach(()=>{
		dailyArticles  = require("../../../store/dummyArticles")
		store = mockStore({})
		store.clearActions();
		mockAxios.mockClear()
	})

	describe("handelArticleSearch", () => {
		it("should dispatch loadArticleSearch and articleSearchSuccesfull", async () => {
			const searchTerm = "some search"
			
			const expectedAction = [{
				type:types.LOAD_ARTICLE_SEARCH
				},
				{type: types.ARTICLE_SEARCH_SUCCESS,
					payload: dailyArticles.dailyArticles
				}
			]

			mockAxios.get.mockImplementationOnce(() => 
				Promise.resolve({data:{articles: dailyArticles.dailyArticles}
			}))

			await store.dispatch(actions.handelArticleSearch(searchTerm)).then(() => {
				expect(store.getActions()).toEqual(expectedAction)
			})
		})

		it("should dispatch articelSearchError when error occures", async () => {
			const expectedAction = [{
				type: types.LOAD_ARTICLE_SEARCH
			},{
				type:types.ARTICLE_SEARCH_ERROR,
				payload: "something went wrong"
			}]
			
			mockAxios.get.mockImplementationOnce(() => Promise.reject({
				response:{data:"something went wrong"}
			}))

			await store.dispatch(actions.handelArticleSearch("some search")).then(() => {
				expect(store.getActions()).toEqual(expectedAction)
			})
		})
	})
})