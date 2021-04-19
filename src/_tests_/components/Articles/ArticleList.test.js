import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { shallow } from "enzyme";
import ArticleList from "../../../components/Articles/ArticleList"
import Article from '../../../components/Articles/Article'
import { consoleSpyForProptypeError } from '../../../setupTests'

const mockStore = configureMockStore([thunk])

describe("ArticleList as newsApiArticleList", () => {
	describe("with Articles", ()=>{
		let store;
		let component;
		
		consoleSpyForProptypeError()

		const initialState = {newsApiArticleReducer:{
		errorMsg:'',
		isLoading: false,
		articles: [{author: null,
			clean_url: "tagesspiegel.de",
			country: "DE",
			language: "de",
			link: "https://www.tagesspiegel.de/politik/atomgespraeche-in-wien-was-fuer-einen-deal-mit-dem-iran-spricht-und-was-dagegen/27108042.html",
			published_date: "2021-04-18 16:47:42",
			rank: "2124",
			rights: "tagesspiegel.de",
			summary: "Die Zeit wird knapp. Das sagt zumindest Irans Außenminister Dschawad Sarif und dringt auf eine rasche Lösung bei den Wiener Gesprächen zur Wiederbelebung des Atomabkommens.Sarif befürwortet die Vereinbarung mit dem Westen, aber er braucht rasche Erfolge. Denn die Hardliner in Teheran fordern den Abbruch der Verhandlungen. Und bald wird ein neuer Präsident gewählt. Innenpolitische Differenzen auf der iranischen Seite sind nur eines der Probleme bei den Gesprächen, die nach ersten Beratungen nun auf Expertenebene fortgesetzt werden sollen.",
			title: "Was für einen Deal mit dem Iran spricht",
			topic: "politics",
			_id: "a566a5dca65e7e53184b138813ae43ca"}
		]}
		}

		it("should render without errors", () =>{
			store = mockStore(initialState)

			component= shallow(<ArticleList store={store} listType='newsApiArticle'/>).dive({context:{store}}).dive()
			expect(component.length).toEqual(1)
			expect(component.find(Article).length).toEqual(1)
			expect(component.find(Article).props().articleType).toEqual('newsApiArticle')

			expect(component.find('.noArticleError').length).toEqual(0)
			expect(component.find('.loadingMsg').length).toEqual(0)
			expect(console.error).not.toHaveBeenCalled()
		})
		
		it("should throw error when wrong proptypes are provided", () => { 
			store = mockStore(initialState)

			shallow(<ArticleList store={store} />).dive({context:{store}}).dive()
			expect(console.error).toHaveBeenCalledTimes(1)
		})
	})

	describe("without articles", ()=>{
		let store;
		let component;
		
		consoleSpyForProptypeError()

		it('should render isLoading when loading articles' , () => {
			const state = {newsApiArticleReducer:{
				errorMsg:'',
				isLoading: true,
				articles: []}
			}
	
			store = mockStore(state)
			component = shallow(<ArticleList store={store} listType='newsApiArticle'/>).dive({context:{store}}).dive()

			expect(component.find('.loadingMsg').length).toEqual(1)

			expect(component.find(Article).length).toEqual(0)
			expect(component.find('.noArticleError').length).toEqual(0)
			expect(console.error).not.toHaveBeenCalled()

		})

		it('should render errormsg when error occures', ()=>{

		const state = {newsApiArticleReducer:{
			errorMsg:'some error',
			isLoading: false,
			articles: []}
		}
			store = mockStore(state)
			component = shallow(<ArticleList store={store} listType='newsApiArticle'/>).dive({context:{store}}).dive()

			expect(component.find('.loadingMsg').length).toEqual(0)

			expect(component.find(Article).length).toEqual(0)
			expect(component.find('.noArticleError').length).toEqual(1)
			expect(component.find('.noArticleError').text()).toEqual('some error')
		})
	})
	
})

describe("ArticleList as userArticleList", ()=>{
	let store;
	let component;
	consoleSpyForProptypeError()

	const initialState = {userArticleReducer:{
	errorMsg:'',
	isLoading: false,
	articles: [{id: 30, 
		title:"daily3 some third article", 
		description: "daily3 some third description", 
		url: "daily3 someUrl", 
		urlToImage: "daily3 url third to image", 
		source:{name: "daily3 source"}, 
		isBookmarked: false}
	]}
	}
	it("should render without errors", () =>{
		store = mockStore(initialState)

		component= shallow(<ArticleList store={store} listType='userArticle'/>).dive({context:{store}}).dive()
		expect(component.length).toEqual(1)
		expect(component.find(Article).length).toEqual(1)

		console.log(component.debug())
		expect(component.find(Article).props().articleType).toEqual('userArticle')

		expect(component.find('.noArticleError').length).toEqual(0)
		expect(component.find('.loadingMsg').length).toEqual(0)
		expect(console.error).not.toHaveBeenCalled()

	})
})
	