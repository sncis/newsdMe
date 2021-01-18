import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { shallow } from "enzyme";
import RegisterComponent from '../../components/RegisterComponent';


describe("RegisterComponent", () => {
	let component;
	let store;

	const mockStore = configureMockStore([thunk])
	const registerMock = jest.fn()

	beforeEach(() => {
		
		store = mockStore({userReducer:{}});
		store.dispatch = jest.fn()
		component = shallow(<RegisterComponent store={store} registerUser={registerMock}/>).dive({ context: { store } }).dive()
	})

	it("should render without errors", () => {
		expect(component.length).toEqual(1)
		expect(component.find("input").length).toEqual(4)
		expect(component.find('button').length).toEqual(2)
		
	})
	it("should set username", () => {
		const usernameInput = component.find('#username')
		usernameInput.simulate('change', {target: {value: "someUser"}})

		expect(component.state('userName')).toEqual("someUser")

	})
	it("should set password", () => {
		const passwordInput = component.find('#password')
		passwordInput.simulate('change', {target: {value: "somePass"}})

		expect(component.state('password')).toEqual("somePass")
	})
	it("should set confirmPassword", () => {
		const confirmPasswordInput = component.find('#confPassword')
		confirmPasswordInput.simulate('change', {target: {value: "confirmPass"}})

		expect(component.state('confirmPassword')).toEqual("confirmPass")
	})
	it("should set email", () => {
		const confirmPasswordInput = component.find('#email')
		confirmPasswordInput.simulate('change', {target: {value: "someEmail"}})

		expect(component.state('email')).toEqual("someEmail")
	})
	it("should submit form when submitButton clicked", () => {
		const onClickMock = jest.spyOn(component.instance(),"submitRegistration")
		component.setState({password: "somePass", confirmPassword:"somePass"})

		component.instance().submitRegistration({preventDefault(){}});
		expect(onClickMock).toHaveBeenCalledTimes(1)
	})
	it("should show errorMsg when submitBtn clicked and password don't match", () => {
		component.setState({password: "somePass", confirmPassword:"someOtherPass"})
		
		const onClickMock = jest.spyOn(component.instance(),"submitRegistration")
		const registerSpy = jest.spyOn(store, 'dispatch')

		component.instance().submitRegistration({preventDefault(){}});
		expect(onClickMock).toHaveBeenCalledTimes(1)
		expect(component.find('#passwordMatchingError').length).toEqual(1)

		expect(registerSpy).not.toHaveBeenCalled()
	})


})

describe("RegisterComponent", () => {
	let component;
	let store;

	const mockStore = configureMockStore([thunk])


	beforeEach(() => {
		store = mockStore({userReducer: {isLoading:true, errorMsg: "some error"}});
		component = shallow(<RegisterComponent store={store} />).dive({ context: { store } }).dive();
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