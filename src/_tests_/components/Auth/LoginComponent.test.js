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
		userName: 'someUser',
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

	it("should setUsername", () => {
		const usernameInput = component.find("#username")

		usernameInput.simulate("change", {target: {value:"someUser"}})

		expect(component.state("userName")).toBe("someUser")

	})
	it("should setPassword", () => {
		const usernameInput = component.find("#password")

		usernameInput.simulate("change", {target: {value:"somePass"}})

		expect(component.state("password")).toBe("somePass")

	})

	it("should dispatch loginUser when button click", () => {
		const onClickMock = jest.spyOn(component.instance(), 'handelLogin')

		component.instance().handelLogin({preventDefault(){}});
		expect(onClickMock).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalled()

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

		const store = mockStore({userReducer:{isLoading:true, errorMsg: "some error"}});
		shallow(<LoginComponent store={store} loginUser={'some'}/>).dive()
		expect(console.error).toHaveBeenCalled()
		
	})
	
})