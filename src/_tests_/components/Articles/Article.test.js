import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { shallow} from "enzyme";
import {BookmarkIcon, BookmarkFillIcon} from '@primer/octicons-react'
import { consoleSpyForProptypeError } from '../../../setupTests'

import { Article } from '../../../components/Articles/Article';

const mockStore = configureMockStore([thunk])

const dummyArticle = {author: null,
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
			_id: "a566a5dca65e7e53184b138813ae43ca",
	bookmarked:false

}

const setProps = (isBookmarked, isLoggedIn, articleType) => {
	const article = {author: null,
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
				_id: "a566a5dca65e7e53184b138813ae43ca",
		bookmarked:isBookmarked
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
		const props = setProps(false, true,'newsApiArticleReducer')
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

		expect(component.instance().props.article["bookmarked"]).toEqual(false)

		bookmark.simulate('click', {dummyArticle})

		expect(spy).toHaveBeenCalledTimes(1)
		expect(component.instance().props.article["bookmarked"]).toEqual(true)
	})
	
})
describe("Article as DailyArticle when logedOut", () =>{
	let store;
	let component;

	consoleSpyForProptypeError()


	beforeEach(() => {
		const props = setProps(false, false,'newsApiArticleReducer' +
				'')

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


		expect(component.instance().props.article["bookmarked"]).toEqual(false)

		bookmark.simulate('click', {dummyArticle})

		expect(spy).toHaveBeenCalledTimes(0)
		expect(spyHistory).toHaveBeenCalledWith('/auth/1')
		expect(component.instance().props.article["bookmarked"]).toEqual(false)
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

		expect(component.instance().props.article["bookmarked"]).toEqual(true)

		bookmark.simulate('click', {dummyArticle})

		expect(spy).toHaveBeenCalledTimes(1)
		expect(component.instance().props.article["bookmarked"]).toEqual(false)
	
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