import * as helpers from "../../../store/actions/articleActionHelpers"

import {testArticles} from "../../testArticles";

jest.mock('../../../store/store/store')

describe("helperFunctions", ()=>{
	beforeEach(()=>{
		jest.clearAllMocks()
	})

	it("should replaceArticleInArticlesArray in newsAPISearch", ()=>{
		const article = {id: 30, title:"article", description: "description"}

		const artArray = [
				{id: 30, title:"daily3 some third article", description: "daily3 some third description"},
				{id: 15, title:"someerercwee article", description: "some description"}]


		const expectedArticles = [
				{id: 30, title:"article", description: "description"},
				{id: 15, title:"someerercwee article", description: "some description"}]

		expect(helpers.replaceArticleInArticlesArray(article,artArray)).toEqual(expectedArticles)
	
	})

	it("should add article to localStorage when no article is there", () => {
		const article = {id: 30, title:"article", description: "description"}

		const getLocalStorageSpy = jest.spyOn(global.localStorage, 'getItem').mockReturnValue(null)
		const setLocalStorageSpy = jest.spyOn(global.localStorage, "setItem")

		helpers.addArticleToLocalStorage(article)

		expect(getLocalStorageSpy).toHaveBeenCalledWith("bookmarkedArticles")
		expect(setLocalStorageSpy).toHaveBeenCalledWith("bookmarkedArticles", JSON.stringify([article]))

	})

	it("should add article to localStorage when article are in localStorage", () => {
		const article = {id: 30, title:"article", description: "description"}

		const getLocalStorageSpy = jest.spyOn(global.localStorage, 'getItem').mockReturnValue(JSON.stringify(testArticles))

		const setLocalStorageSpy = jest.spyOn(global.localStorage, "setItem")

		helpers.addArticleToLocalStorage(article)
		expect(getLocalStorageSpy).toHaveBeenCalledWith("bookmarkedArticles")
		expect(setLocalStorageSpy).toHaveBeenCalledWith("bookmarkedArticles",JSON.stringify([...testArticles,article]))

	})

	it('should get an item from local storage based on key', ()=> {
		const article = {id: 30, title:'daily3 some third article', description: 'daily3 some third description', url: 'daily3 someUrl', urlToImage: 'daily3 url third to image', source:{name: 'daily3 source'}, isBookmarked: true}
		const jsonArticle = JSON.stringify(article)
		const spy = jest.spyOn(localStorage, 'getItem').mockReturnValue(jsonArticle)

		const result = helpers.getItemFromLocalStorage("bookmarkedArticles",[])
		expect(spy).toHaveBeenCalled()
		expect(result).toEqual(article)
	})

	it("should return default value when key not exist", ()=>{
		jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(null)
		const result =	helpers.getItemFromLocalStorage("bookmarkedArticles",[])

		expect(result).toEqual([])
	})

	it("should return default value when error occures", () => {
		jest.spyOn(localStorage, 'getItem').mockReturnValue(new Error('Some error'))
		const result =	helpers.getItemFromLocalStorage("bookmarkedArticles",[])

		expect(result).toEqual([])
	})
})