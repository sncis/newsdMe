
import { dailyArticles } from '../../../store/dummyArticles'
import * as helpers from "../../../store/actions/articleActionHelpers"

import store from '../../../store/store/store'

jest.mock('../../../store/store/store')

describe("helperFunctions", ()=>{
	const initialState = {
		newsAPIdailyArticleReducer:{
			articles: dailyArticles
		},
		newsAPIsearchReducer:{
			articles: dailyArticles
		}
	}

	store.getState = () => initialState

	it("should replaceArticleInArticlesArray in dailyArticles", ()=>{
		const article = {id: 30, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: true}
		const expectedArticles = [{id: 30, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: true},
		{id: 15, title:"someerercwee article", description: "some description", url: "someUrl", urlToImage: "url to image", source:{name: "name to source"}, isBookmarked: false}]

		expect(helpers.replaceArticleInArticlesArray(article,"dailyArticle")).toEqual(expectedArticles)
	})

	it("should replaceArticleInArticlesArray in newsAPISearch", ()=>{
		const article = {id: 30, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: true}
		const expectedArticles = [{id: 30, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: true},
		{id: 15, title:"someerercwee article", description: "some description", url: "someUrl", urlToImage: "url to image", source:{name: "name to source"}, isBookmarked: false}]

		expect(helpers.replaceArticleInArticlesArray(article,"searchArticle")).toEqual(expectedArticles)
	
	})

	it("should add article to localStorage", () => {
		const article = {id: 30, title:"daily3 some third article", description: "daily3 some third description", url: "daily3 someUrl", urlToImage: "daily3 url third to image", source:{name: "daily3 source"}, isBookmarked: true}

		const getLocalStorageSpy = jest.spyOn(global.localStorage, 'getItem')
		const setLocalStorageSpy = jest.spyOn(global.localStorage, "setItem")

		helpers.addArticleToLocalStorage(article)
		expect(getLocalStorageSpy).toHaveBeenCalled()
		expect(setLocalStorageSpy).toHaveBeenCalled()

	})

	it('should get an item from local storage based on key', ()=> {
		const article = {id: 30, title:'daily3 some third article', description: 'daily3 some third description', url: 'daily3 someUrl', urlToImage: 'daily3 url third to image', source:{name: 'daily3 source'}, isBookmarked: true}
		const jsonArticle = JSON.stringify(article)
		const spy = jest.spyOn(localStorage, 'getItem').mockImplementationOnce().mockReturnValue(jsonArticle)

		const result =	helpers.getItemFromLocalStorage("bookmarkedArticles",[])
		expect(spy).toHaveBeenCalled()
		expect(result).toEqual(article)
	})

	it("should return default value when key not exist", ()=>{
		jest.spyOn(localStorage, 'getItem').mockImplementationOnce().mockReturnValue(null)
		const result =	helpers.getItemFromLocalStorage("bookmarkedArticles",[])

		expect(result).toEqual([])
	})

	it("should return default value when error occures", () => {
		jest.spyOn(localStorage, 'getItem').mockImplementationOnce().mockReturnValue(new Error('Some error'))
		const result =	helpers.getItemFromLocalStorage("bookmarkedArticles",[])

		expect(result).toEqual([])
	})
})