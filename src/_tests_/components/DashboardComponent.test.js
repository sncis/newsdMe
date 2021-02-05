import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { mount, shallow } from "enzyme";
import { Provider } from 'react-redux'

import DashboardComponent , {Dashboard} from '../../components/DashboardComponent'
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
			handleSearch: jest.fn(),
		}

		store = mockStore({})
		store.dispatch = jest.fn()

		component = mount(<DashboardComponent store={store} {...props}/>)
			
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
	
		expect(store.dispatch).toHaveBeenCalledTimes(2)
	})

	it("should dispatch handleSearch when click on button", ()=> {
		const spy = jest.spyOn(component.props(), 'handleSearch')
		const button = component.find('button')
		button.simulate('click')

		expect(spy).toHaveBeenCalledTimes(1)
	})
})