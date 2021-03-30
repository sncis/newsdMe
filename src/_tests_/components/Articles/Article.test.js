import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { shallow} from "enzyme";
import {BookmarkIcon, BookmarkFillIcon} from '@primer/octicons-react'
import { consoleSpyForProptypeError } from '../../../setupTests'

import { Article } from '../../../components/Articles/Article';

const mockStore = configureMockStore([thunk])

const dummyArticle = {id: 30, 
	title:"daily3 some third article", 
	description: "daily3 some third description", 
	url: "daily3 someUrl", 
	urlToImage: "daily3 url third to image", 
	source: {
		name:"daily3 source",
	}, 
	isBookmarked: false
}

const setProps = (isBookmarked, isLoggedIn, articleType) => {
	const article = {id: 30, 
		title:"daily3 some third article", 
		description: "daily3 some third description", 
		url: "daily3 someUrl", 
		urlToImage: "daily3 url third to image", 
		source: {
			name:"daily3 source",
		}, 
		isBookmarked: isBookmarked
	}

	const props = {
			article: article,
			removeUserArticle: jest.fn(),
			saveUserArticle: jest.fn(),
			history: {push: jest.fn()},
			isLoggedIn: isLoggedIn,
			articleType: articleType
		}
	return props
}


describe("Article as DailyArticle when logedIn", () =>{
	let store;
	let component;
	consoleSpyForProptypeError()

	beforeEach(() => {
		const props = setProps(false, true,'newsAPIdailyArticle')
		store = mockStore({})
		store.dispatch = jest.fn()

		component = shallow(<Article store={store} {...props}/>)
	})

	it("should render without errors", () =>{
		expect(component.length).toEqual(1)
		expect(component.find('.article_container').length).toEqual(1)
		expect(component.find('.article_link-to-article').length).toEqual(1)
		expect(component.find('.article_thumbnail').length).toEqual(1)
		expect(component.find('.article_title').length).toEqual(1)
		expect(component.find('.article_description').length).toEqual(1)
		expect(component.find('.article_source').length).toEqual(1)
		expect(component.find('.article_bookmark-container').length).toEqual(1)

		expect(component.find(BookmarkIcon).length).toEqual(1)
		expect(console.error).not.toHaveBeenCalled()


	})
	it('should bookmark article when clicking on bookmarkIcon', () => {

		const bookmark = component.find(".article_bookmark-container")

		const spy = jest.spyOn(component.instance().props, "saveUserArticle")

		expect(component.instance().props.article["isBookmarked"]).toEqual(false)	

		bookmark.simulate('click', {dummyArticle})

		expect(spy).toHaveBeenCalledTimes(1)
		expect(component.instance().props.article["isBookmarked"]).toEqual(true)	
	})
	
})
describe("Article as DailyArticle when logedOut", () =>{
	let store;
	let component;

	consoleSpyForProptypeError()


	beforeEach(() => {
		const props = setProps(false, false,'newsAPIdailyArticle')

		store = mockStore({})
		store.dispatch = jest.fn()

		component = shallow(<Article store={store} {...props}/>)
	})

	it("should render without errors and unfilled Bookmark", () =>{
		expect(component.length).toEqual(1)
		expect(component.find('.article_container').length).toEqual(1)
		expect(component.find('.article_link-to-article').length).toEqual(1)
		expect(component.find('.article_thumbnail').length).toEqual(1)
		expect(component.find('.article_title').length).toEqual(1)
		expect(component.find('.article_description').length).toEqual(1)
		expect(component.find('.article_source').length).toEqual(1)
		expect(component.find('.article_bookmark-container').length).toEqual(1)

		expect(component.find(BookmarkIcon).length).toEqual(1)
		expect(console.error).not.toHaveBeenCalled()
	})



	it('should not bookmark article when clicking on bookmarkIcon', () => {
	
		const bookmark = component.find(".article_bookmark-container")

		const spy = jest.spyOn(component.instance().props, "saveUserArticle")
		const spyHistory = jest.spyOn(component.instance().props.history, "push")


		expect(component.instance().props.article["isBookmarked"]).toEqual(false)	

		bookmark.simulate('click', {dummyArticle})

		expect(spy).toHaveBeenCalledTimes(0)
		expect(spyHistory).toHaveBeenCalledWith('/auth/1')
		expect(component.instance().props.article["isBookmarked"]).toEqual(false)	
	})
	
})


describe("Article as UserArticle", () => {
	let store;
	let component;
	consoleSpyForProptypeError()

	beforeEach(() => {
		const props = setProps(true, true,'userArticle')

		store = mockStore({})
		store.dispatch = jest.fn()
		component = shallow(<Article store={store} {...props}/>)
	})

	it("should render without errors and filled Bookmark", () =>{
		expect(component.length).toEqual(1)
		expect(component.find('.article_container').length).toEqual(1)
		expect(component.find('.article_link-to-article').length).toEqual(1)
		expect(component.find('.article_thumbnail').length).toEqual(1)
		expect(component.find('.article_title').length).toEqual(1)
		expect(component.find('.article_description').length).toEqual(1)
		expect(component.find('.article_source').length).toEqual(1)
		expect(component.find('.article_bookmark-container').length).toEqual(1)

		expect(component.find(BookmarkFillIcon).length).toEqual(1)
		expect(console.error).not.toHaveBeenCalled()

	})

	it("should unBookmark article", () => {
		const bookmark = component.find(".article_bookmark-container")

		const spy = jest.spyOn(component.instance().props, "removeUserArticle")

		expect(component.instance().props.article["isBookmarked"]).toEqual(true)	

		bookmark.simulate('click', {dummyArticle})

		expect(spy).toHaveBeenCalledTimes(1)
		expect(component.instance().props.article["isBookmarked"]).toEqual(false)	
	
	})
})

describe("Article", () => {
	consoleSpyForProptypeError()

	const props = setProps("true", true,'user')
	const store = mockStore({})

	it("should throw error when wrong propTyes are provided", ()=>{
		shallow(<Article store={store} {...props}/>)
		expect(console.error).toHaveBeenCalledTimes(1)
	})
})