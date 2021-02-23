import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { shallow, mount } from "enzyme";
import {BookmarkIcon, BookmarkFillIcon} from '@primer/octicons-react'


import { ArticleComp } from '../../components/ArticleComponent';

const mockStore = configureMockStore([thunk])


describe("ArticleComponent", () => {
	let store;
	let component;

	const article = { id: 30, 
		title:"daily3 some third article", 
		description: "daily3 some third description", 
		url: "daily3 someUrl", 
		urlToImage: "daily3 url third to image", 
		source:{name: "daily3 source"}, 
		isBookmarked: false}


	beforeEach(() => {
		const props = {
			article: article,
			removeUserArticle: jest.fn(),
			saveUserArticle: jest.fn(),
			history: {push: jest.fn()},
			isLoggedIn: true
		}
	
		store = mockStore({})
		store.dispatch = jest.fn()

		component = shallow(<ArticleComp store={store} {...props}/>)
})
	
	it("should render without errors", () => {

		expect(component.length).toEqual(1)
		expect(component.find('.container').length).toEqual(1)
		expect(component.find('.link-to-article').length).toEqual(1)
		expect(component.find('.thumbnail').length).toEqual(1)
		expect(component.find('.title').length).toEqual(1)
		expect(component.find('.description').length).toEqual(1)
		expect(component.find('.source').length).toEqual(1)
		expect(component.find('.bookmark-container').length).toEqual(1)

		expect(component.find(BookmarkIcon).length).toEqual(1)

	})

	it('should bookMark article when clicking on bookmarkIcon', () => {
		const bookmark = component.find(".bookmark-container")

		const spy = jest.spyOn(component.instance().props, "saveUserArticle")

		bookmark.simulate('click', {article})

		expect(spy).toHaveBeenCalledTimes(1)	
	})


})

describe("ArticleComponent is bookmarked", () => {
	it("should render with filled Bookmarked icon", () => {
		let store;
		let component;

	const article ={id: 30, 
		title:"daily3 some third article", 
		description: "daily3 some third description", 
		url: "daily3 someUrl", 
		urlToImage: "daily3 url third to image", 
		source:{name: "daily3 source"}, 
		isBookmarked: true}


		const props = {
			article: article,
			removeUserArticle: jest.fn(),
			saveUserArticle: jest.fn(),
			history: {push: jest.fn()},
			isLoggedIn: true
		}
	
		store = mockStore({})
		store.dispatch = jest.fn()

		component = shallow(<ArticleComp store={store} {...props}/>)

		const bookmark = component.find(".bookmark-container")

		const spy = jest.spyOn(component.instance().props, "removeUserArticle")

		bookmark.simulate('click', {article})

		expect(spy).toHaveBeenCalledTimes(1)	

	})
})