import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import * as actions from "../../../../store/actions/articleActions/newsApiActions"
import * as types from "../../../../store/types/newsAPIdailyArticleTypes"
import {testArticles} from "../../../testArticles";
import newsApiFetcher from "../../../../store/apiHelpers/newsApiFetcher";
import mockAxios from 'axios'

const mockStore = configureMockStore([thunk])

jest.mock("../../../../store/apiHelpers/newsApiFetcher")

describe('newsApiActions', () => {
  let store;
  let articles

  beforeEach(()=>{
    store = mockStore({})
    store.clearActions();
  })



  describe("fetchArticles", () => {
    it("should dispatch FETCH_ARTICLES_SUCCEEDED", async () => {

      newsApiFetcher.mockImplementationOnce(()=> Promise.resolve({
      data:{articles:testArticles}
    }))

      let expectedActions =[{
        type: types.IS_LOADING_ARTICLES
      },
        {
          type: types.FETCH_ARTICLES_SUCCEEDED,
          payload: testArticles
        }]
      await store.dispatch(actions.fetchArticles()).then(()=>{
        console.log(store.getActions())
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
    it("should dispatch Fetch Article Failed", async () => {
      newsApiFetcher.mockImplementationOnce(()=> Promise.reject({message: "some error"}))

      let expectedActions =[{
        type: types.IS_LOADING_ARTICLES
      },
        {
          type: types.FETCH_ARTICLES_FAILED,
          payload: "some error"
        }]
      await store.dispatch(actions.fetchArticles()).then(()=>{
        console.log(store.getActions())
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

})