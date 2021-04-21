import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { Router } from 'react-router-dom'

import { mount } from "enzyme";
import { createMemoryHistory } from 'history'

import {DashboardComponent} from '../../components/DashboardComponent'

jest.mock("../../components/Articles/ArticleList", ()=>"ArticleList")

describe("DashboardComponent", () => {
	let component;
	let store;

	const mockStore = configureMockStore([thunk])


	beforeEach(() => {
		const history = createMemoryHistory()

		store = mockStore({})
		store.dispatch = jest.fn()

		component = mount(<Router history={history}><DashboardComponent store={store} loadUserArticles={jest.fn()}/></Router>
		)
	})


	it("should render without errors", () => {
		expect(component.length).toEqual(1)
		expect(component.find("ArticleList").length).toEqual(1)
		expect(component.find("ArticleList").prop('listType')).toBe('userArticle')
	})

	it("should dispatch articleMethods when componentDidMount", () => {
		// expect(component.instance().dispatch).toHaveBeenCalled()
	})

	
})