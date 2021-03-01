import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { mount } from "enzyme";

import {Dashboard} from '../../components/DashboardComponent'
import ArticleList from "../../components/ArticleList"
import SavedArticleList from '../../components/SavedArticleList';

jest.mock("../../components/ArticleList")
jest.mock("../../components/SavedArticleList")

describe("DashboardComponent", () => {
	let component;
	let store;

	const mockStore = configureMockStore([thunk])
	

	beforeEach(() => {
		const props = {
			loadArticles: jest.fn(),
			loadDailyArticles: jest.fn(),
			handelArticleSearch: jest.fn(),
		}

		store = mockStore({})
		store.dispatch = jest.fn()

		component = mount(<Dashboard store={store} {...props}/>
		)
			
	})


	it("should render without errors", () => {
		console.log(component)
		expect(component.length).toEqual(1)
		expect(component.find(ArticleList).length).toEqual(1)
		expect(component.find('input').length).toEqual(1)
		expect(component.find('button').length).toEqual(1)
		expect(component.find(SavedArticleList).length).toEqual(1)
	})

	it("should dispatch articleMethods when componentDidMount", () => {
	
		expect(component.instance().props.loadArticles).toHaveBeenCalledTimes(1)
		expect(component.instance().props.loadDailyArticles).toHaveBeenCalledTimes(1)

	})

	it("should dispatch handleSearch when click on button", ()=> {
		const spy = jest.spyOn(component.instance().props, 'handelArticleSearch')
		const button = component.find('button')
		button.simulate('click')

		expect(spy).toHaveBeenCalledTimes(1)
		expect(component.instance().props.handelArticleSearch).toHaveBeenCalledTimes(1)
	})
})