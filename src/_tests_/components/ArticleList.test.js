import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { shallow } from "enzyme";
import ArticleList from "../../components/ArticleList"
import Article from '../../components/Article'
import { consoleSpyForProptypeError } from '../../setupTests'

const mockStore = configureMockStore([thunk])

describe("ArticleList as DailyArticleList", () => {
	let component;
	let store;
	
	consoleSpyForProptypeError()

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

	it("should render without errors", () =>{
		store = mockStore(initialState)

		component= shallow(<ArticleList store={store} listType='daily'/>).dive({context:{store}}).dive()
		expect(component.length).toEqual(1)
		expect(component.find(Article).length).toEqual(1)

		expect(component.find('.noArticleError').length).toEqual(0)
		expect(component.find('.loadingMsg').length).toEqual(0)
		expect(console.error).not.toHaveBeenCalled()

	})

})