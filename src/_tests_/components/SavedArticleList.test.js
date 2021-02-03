import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { shallow } from "enzyme";


import SavedArticleList from "../../components/SavedArticleList"
import SavedArticleComponent from '../../components/SavedArticleComponent'


describe("SavedArticleList", () => {
	let component
	let store 

	const mockStore = configureMockStore([thunk])
	
	const initialState = {articleReducer:{
		errorMsg:'',
		isLoading: false,
		savedArticles: [{id: 30, 
			title:"daily3 some third article", 
			description: "daily3 some third description", 
			url: "daily3 someUrl", 
			urlToImage: "daily3 url third to image", 
			source:{name: "daily3 source"}, 
			isBookmarked: true}
		]}
	}

	it("should render without errors", () => {
		store = mockStore(initialState)
		component = shallow(<SavedArticleList store={store} />).dive({context:{store}}).dive()

		expect(component.length).toEqual(1)
		expect(component.find(SavedArticleComponent).length).toEqual(1)
		expect(component.find(".isLoading").length).toEqual(0)
		expect(component.find(".errorMsg").length).toEqual(0)

	})
	it("should render errorMsg", ()=>{
		store = mockStore({articleReducer: {
			savedArticlesErrorMsg:'some error',
			isLoading: false,
			savedArticles:[]

		}})
		component = shallow(<SavedArticleList store={store} />).dive({context:{store}}).dive()
		
		expect(component.find(SavedArticleComponent).length).toEqual(0)
		expect(component.find(".isLoading").length).toEqual(0)
	
		expect(component.find(".errorMsg").length).toEqual(1)
		expect(component.find(".errorMsg").text()).toEqual("some error")

	})

	it('should render isLoading message', ()=>{
		store = mockStore({articleReducer:{
			errorMsg:'',
			isLoading:true,
			savedArticles:[]
		}})

		component = shallow(<SavedArticleList store={store} />).dive({context:{store}}).dive()

		expect(component.find(".errorMsg").length).toEqual(0)
		expect(component.find(".isLoading").length).toEqual(1)
		expect(component.find(".isLoading").text()).toEqual("Loading...!")
	})


})