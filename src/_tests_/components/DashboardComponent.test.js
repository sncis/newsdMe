import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { mount } from "enzyme";

import {DashboardComponent} from '../../components/DashboardComponent'

jest.mock("../../components/Articles/ArticleList", ()=>"ArticleList")

describe("DashboardComponent", () => {
	let component;
	let store;

	const mockStore = configureMockStore([thunk])
	

	beforeEach(() => {
		const props = {
			loadUserArticles: jest.fn(),
		}

		store = mockStore({})
		store.dispatch = jest.fn()

		component = mount(<DashboardComponent store={store} {...props}/>
		)
	})


	it("should render without errors", () => {
		console.log(component.debug())
		expect(component.length).toEqual(1)
		expect(component.find("ArticleList").length).toEqual(1)
		expect(component.find("ArticleList").prop('listType')).toBe('userArticle')
	})

	it("should dispatch articleMethods when componentDidMount", () => {
		expect(component.instance().props.loadUserArticles).toHaveBeenCalledTimes(1)

	})

	
})