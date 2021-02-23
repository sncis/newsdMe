import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { shallow } from "enzyme";

import ArticleList from "../../components/ArticleList"
import ArticleComponent from '../../components/ArticleComponent';

describe("ArticleList", () => {
	let component
	let store 

	const mockStore = configureMockStore([thunk])

	
	const initialState = {articleReducer:{
		errorMsg:'',
		isLoading: false,
		dailyArticles: [{id: 30, 
			title:"daily3 some third article", 
			description: "daily3 some third description", 
			url: "daily3 someUrl", 
			urlToImage: "daily3 url third to image", 
			source:{name: "daily3 source"}, 
			isBookmarked: false}
		]}
	}

	// beforeEach(() => {
	// 	store = mockStore(initialState)

	// 	component= shallow(<ArticleList  store={store}/>).dive({context:{store}}).dive()
	// }) 


	it("shoud render whithout errors", () => {
		store = mockStore(initialState)

		component= shallow(<ArticleList  store={store}/>).dive({context:{store}}).dive()
		expect(component.length).toEqual(1)
		expect(component.find(ArticleComponent).length).toEqual(1)

		expect(component.find('.noArticleError').length).toEqual(0)
		expect(component.find('.loadingMsg').length).toEqual(0)

	})

	it("should render errorMsg", () => {
		store = mockStore({articleReducer:{
			errorMsg:'some error',
			isLoading: false,
			dailyArticles: []
		}})

		component= shallow(<ArticleList  store={store}/>).dive({context:{store}}).dive()

		expect(component.length).toEqual(1)
		expect(component.find(ArticleComponent).length).toEqual(0)

		expect(component.find('.noArticleError').length).toEqual(1)
		expect(component.find('.loadingMsg').length).toEqual(0)

	})

	it("should render loadingMessage", () => {
		store = mockStore({articleReducer:{
			errorMsg:'',
			isLoading: true,
			dailyArticles: []
		}})

		component= shallow(<ArticleList  store={store}/>).dive({context:{store}}).dive()

		expect(component.length).toEqual(1)
		expect(component.find(ArticleComponent).length).toEqual(0)

		expect(component.find('.noArticleError').length).toEqual(0)
		expect(component.find('.loadingMsg').length).toEqual(1)

	})
})