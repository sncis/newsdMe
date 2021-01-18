import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { shallow } from "enzyme";
import LoginComponent from '../../components/LoginComponent';




describe("LoginComponent", () => {
	let component;
	let store;
	// const loginUserMock = jest.spyOn(LoginComponent.prototype, 'loginUser');
	const loginMock = jest.fn();
	const mockStore = configureMockStore([thunk])
	
	const initialState = {userReducer: {
		isLoading: false,
		userName: 'someUser',
		}
	}
		;

	beforeEach(() => {
		
		store = mockStore(initialState);

		store.dispatch = jest.fn()
		component = shallow(<LoginComponent store={store} LoginUser={loginMock}/>).dive({ context: { store } }).dive()
	})

	it("should render without errors", () => {
		expect(component.length).toEqual(1)

		expect(component.find("input").length).toEqual(2)
		expect(component.find("button").length).toEqual(1)

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
		// const user = {username: "user", password:"pass"}
		// const action = loginUserAction(user)

		component.instance().handelLogin({preventDefault(){}});
		expect(onClickMock).toHaveBeenCalledTimes(1);
		// expect(store.dispatch).toHaveBeenCalledWith(action)

	})

})

describe("LoginComponent", () => {
	let component;
	let store;

	const mockStore = configureMockStore([thunk])


	beforeEach(() => {
		store = mockStore({userReducer:{isLoading:true, errorMsg: "some error"}});
		component = shallow(<LoginComponent store={store} />).dive({ context: { store } }).dive();
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