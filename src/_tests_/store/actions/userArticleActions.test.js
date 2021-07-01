import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';

import * as actions from "../../../store/actions/userArticleActions"
import * as types from "../../../store/types/userArticelTypes"
import { SET_DAILY_ARTICLES_SUCCESS } from  "../../../store/types/newsAPIdailyArticleTypes"
import { dummyArticles,dailyArticles } from '../../../store/dummyArticles';
import mockAxios from 'axios'
import * as helpers from "../../../store/actions/actionHelpers/articleActionHelpers"
import {testArticles} from "../../testArticles";
import { FETCH_ARTICLES_SUCCEEDED } from "../../../store/types/newsAPIdailyArticleTypes"

const configureMockStoreWithArg = (fetcher)=> configureMockStore([thunk.withExtraArgument(fetcher)]);


describe("userArticleActions", () => {
	let store;

		const mockState = {
			userArticleReducer:{
				articles: dummyArticles},
			newsApiArticleReducer:{
				articles: dailyArticles
			},
			userReducer:{
				username: 'someUser',
				jwtToken: 'someToken'
			}
		};

		afterEach(()=>{
			store.clearActions();
		});

	describe("getUserArticles", () => {


		it("should dispatch loadUserArticles and getUserArticlesSucceeded", async() => {
			const backendFetcher =  () => Promise.resolve({headers:{cookie:'some cookie'}, data: testArticles})
			const mockStore = configureMockStoreWithArg(backendFetcher);
			store = mockStore(mockState);

			const expectedAction =[
					{type: types.IS_LOADING_ARTICLES},
				{
					type: types.GET_USER_ARTICLES_SUCCESS,
					payload: testArticles
			}];

			await store.dispatch(actions.getUserArticles());
			expect(store.getActions()).toEqual(expectedAction)

		});

		it("should dispatch loadUserArticles and getUserArticlesfailed", async() => {

			const backendFetcher =  () => Promise.reject({message: "some error"})
			const mockStore = configureMockStoreWithArg(backendFetcher)
			store = mockStore(mockState)

			const expectedAction =[
				{type: types.IS_LOADING_ARTICLES},
				{
					type: types.GET_USER_ARTICLES_ERROR,
					payload: "some error"
				}];

			await store.dispatch(actions.getUserArticles())
			expect(store.getActions()).toEqual(expectedAction)


		})

	});



	describe("saveUserArticle", () => {
		let spy;
		beforeEach(()=>{
			spy = jest.spyOn(global.localStorage, 'getItem').mockReturnValue(null)
		});

		it("should dispatch addArticleToUserArticleList and replaceArticleInNewsAPIArticlesArray", async () =>{
			const article = {id: 15, 
				title:"someerercwee article", 
				description: "some description", 
				url: "someUrl", 
				urlToImage: "url to image", 
				source: "name to source", 
				isBookmarked: true
			};
			const article1 = {id: 15,
				title:"someerercwee article",
				description: "some description",
				url: "someUrl",
				urlToImage: "url to image",
				source: " to ",
				isBookmarked: false
			};

			const backendFetcher =  () => Promise.resolve({headers:{cookie:'some cookie'}, data: article1})
			
			const mockState ={
				userArticleReducer: {articles:[]},
				userReducer: {username: 'someUser'},
				newsApiArticleReducer: {articles: [...testArticles, article]}};

			const mockStore = configureMockStoreWithArg(backendFetcher);
			store = mockStore(mockState);

			const expectedArticles = [...testArticles, article1];

			const expectedAction = [
				{
					type: types.ADD_ARTICLE_TO_USER_ARTICLELIST,
					payload: article1
				},
				{type: FETCH_ARTICLES_SUCCEEDED,
				payload: expectedArticles}

			];

			await store.dispatch(actions.saveUserArticle(article1));
			expect(store.getActions()).toEqual(expectedAction);
			expect(spy).toHaveBeenCalled()
		});
	
		it("should dispatch getUserArtilcesError", async () =>{

			const article = {id: 15,
				title:"someerercwee article",
				description: "some description",
				url: "someUrl",
				urlToImage: "url to image",
				source: "name to source",
				isBookmarked: true
			};

			const backendFetcher = () => Promise.reject({message: "some error message"})
			
			const mockState ={userArticleReducer: {articles:testArticles}, userReducer: {username: 'someUser'},newsApiArticleReducer:{articles:[]}}
			const mockStore = configureMockStoreWithArg(backendFetcher);
			store = mockStore(mockState);


			let expectedAction=[
				{type: types.GET_USER_ARTICLES_ERROR,
					payload: "some error message"
				}
			];

			await store.dispatch(actions.saveUserArticle(article))
				expect(store.getActions()).toEqual(expectedAction)

		})
	
	});

	describe("deleteArticleInDB", () => {
		it('should dispatch removeBookmarkInDailyArticles and getUserArticles when deleted succesfully', async () => {
			const articles = [...testArticles,{id: 15,
				title:"someerercwee article",
				description: "some description",
				url: "someUrl",
				urlToImage: "url to image",
				source: "name to source",
				isBookmarked: true}]
			const replacedArticle =  [...testArticles,{id: 15,
				title:"someerercwee article",
				description: "some description",
				url: "someUrl",
				urlToImage: "url to image",
				source: "source",
				isBookmarked: false}]

			const mockState ={
				userArticleReducer: {articles:[]},
				userReducer: {username: 'someUser'},
				newsApiArticleReducer: {articles: articles}};
			const backendFetcher =  () => Promise.resolve( {data: testArticles});
			const mockStore = configureMockStoreWithArg(backendFetcher);
			store = mockStore(mockState);

			jest.spyOn(helpers, 'replaceArticleInArticlesArray').mockImplementationOnce(()=> replacedArticle)

			let expectedAction = [
			{
				type: FETCH_ARTICLES_SUCCEEDED,
				payload: replacedArticle
			},{	
				type: types.IS_LOADING_ARTICLES},
				{
					type:types.GET_USER_ARTICLES_SUCCESS,
					payload: testArticles
				}
		];

			await store.dispatch(actions.deleteArticleInDB(articles[1]));
			expect(store.getActions()).toEqual(expectedAction)

		});

		it("should dispatch getUserArticlesFailed", async() =>{

			const backendFetcher = () => Promise.reject( {message: "some error"})
			
			const mockStore = configureMockStoreWithArg(backendFetcher)
			store = mockStore(mockState)


			const expectedAction = [
				{type: types.GET_USER_ARTICLES_ERROR,
				payload: "some error"}
			]
			await store.dispatch(actions.deleteArticleInDB(dailyArticles[0]))
				expect(store.getActions()).toEqual(expectedAction)

		})
	})
});
