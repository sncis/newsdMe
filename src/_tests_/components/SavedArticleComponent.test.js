import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { shallow } from "enzyme";


import {SavedArticleComponentItem} from '../../components/SavedArticleComponent'

describe("SavedArticleComponent", () => {
	const mockStore = configureMockStore([thunk])
	let store;
	let component;
	const article ={id: 30, 
		title:"daily3 some third article", 
		description: "daily3 some third description", 
		url: "daily3 someUrl", 
		urlToImage: "daily3 url third to image", 
		source:{name: "source"}, 
		isBookmarked: true}
	

	beforeEach(()=>{
		store = mockStore({})
		store.dispatch = jest.fn()

		component = shallow(<SavedArticleComponentItem store={store} removeArticle={jest.fn()} article={article}/>)
	})

	it("should render whitout error", () => {
		expect(component.length).toEqual(1)

		expect(component.find('.saved_container').length).toEqual(1)
		expect(component.find('.saved_link-to-article').length).toEqual(1)
		expect(component.find('.saved_thumbnail').length).toEqual(1)
		expect(component.find('.saved_title').length).toEqual(1)
		expect(component.find('.saved_description').length).toEqual(1)
		expect(component.find('.saved_source').length).toEqual(1)
		expect(component.find('.saved_bookmark-container').length).toEqual(1)
	})
	
	it("should remove Article when click on bookmarkIcon", ()=>{
		const bookmark = component.find(".saved_bookmark-container")
		const spy = jest.spyOn(component.instance().props, "removeArticle")

		bookmark.simulate('click', {article})

		expect(spy).toHaveBeenCalledTimes(1)	
	})

})