import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { shallow } from "enzyme";
import LoginComponent from '../../../components/Auth/LoginComponent';

import { consoleSpyForProptypeError } from '../../../setupTests'


describe("LoginComponent", () => {
	let component;
	let store;
	const loginMock = jest.fn();
	const mockStore = configureMockStore([thunk])
	
	const initialState = {userReducer: {
		isLoading: false,
		}
	}

	consoleSpyForProptypeError()

	beforeEach(() => {
		store = mockStore(initialState);

		store.dispatch = jest.fn()
		component = shallow(<LoginComponent store={store} loginUser={loginMock}/>).dive({ context: { store } }).dive()
	})

	it("should render without errors", () => {
		expect(component.length).toEqual(1)

		expect(component.find("label").length).toEqual(2)
		expect(component.find("input").length).toEqual(2)
		expect(component.find("button").length).toEqual(1)

		expect(console.error).not.toHaveBeenCalled()

	})


	it("should dispatch loginUser when FormInput is valid", () => {
		const onClickMock = jest.spyOn(component.instance(), 'handelLogin')
		component.setState({
			username:"someValidUser",
			password:"SomeValidPass1234!"
		})

		component.instance().handelLogin({preventDefault(){}});
		expect(onClickMock).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalled();
		expect(component.find(".validationError").length).toEqual(0)


	})
	it("should not dispatch loginUser when FormInput is invalid and show validation error", () => {
		const onClickMock = jest.spyOn(component.instance(), 'handelLogin')
		component.setState({
			username:"someValidUser",
			password:"SomeVa!",
		})

		component.instance().handelLogin({preventDefault(){}});
		expect(onClickMock).toHaveBeenCalledTimes(1);
		expect(store.dispatch).not.toHaveBeenCalled()
		expect(component.find(".validationError").length).toEqual(1)
		expect(component.find(".validationError").text()).toEqual("please provide valid input")


	})

})

describe("LoginComponent", () => {
	let component;
	let store;

	const mockStore = configureMockStore([thunk])

	beforeEach(() => {
		store = mockStore({userReducer:{isLoading:true, errorMsg: "some error"}});
		component = shallow(<LoginComponent store={store} loginUser={jest.fn()}/>).dive({ context: { store } }).dive()
	})

	it("should render loadingMsg", () => {
		expect(component.instance().props.isLoading).toEqual(true)
		expect(component.find("#loadingMsg").length).toEqual(1)
	
	})
	it("should render errorMsg", () => {
		expect(component.instance().props.errorMsg).toEqual("some error")
		expect(component.find("#errorMsg").length).toEqual(1)
	
	})

})
describe("LoginComponent", () => {

	consoleSpyForProptypeError()

	const mockStore = configureMockStore([thunk])

	it("should throw error when wrong propTypes are provided", () => {

		const store = mockStore({userReducer:{is_loading:true, errorMsg: "some error"}});
		shallow(<LoginComponent store={store} loginUser={'some'}/>).dive()
		expect(console.error).toHaveBeenCalled()
		
	})
	
})