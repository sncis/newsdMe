import * as userActions from "../../../store/actions/userActions"
import * as types from "../../../store/constants/constants"

import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';	
import axios from 'axios';	
import MockAdapter from 'axios-mock-adapter';	


const middleware = [thunk];	
const mockStore = configureMockStore(middleware);	
const mock = new MockAdapter(axios);	
const store = mockStore({});

describe("userActions", () => {
	let user;
	beforeEach(() => {
		store.clearActions();
		user = {"username": "someUser", "password": "somePassword"}

	})

	describe("registerUserAction", () => {
		it("should dispatch registerUserisLoading", () => {
			let expectedAction = [{
				type: types.REGISTER_USER_LOADING,
			}]
		store.dispatch(userActions.registerUserAction(user))
		expect(store.getActions()).toEqual(expectedAction)

		
	})

	it("should dispatch registerUserSuccess", () => {
		mock.onPost("http://localhost:8080/register").reply(200, {user: {userName: "someUsername"}});

		return store.dispatch(userActions.registerUserAction(user)).then(()=>{
			let expectedAction = [{
				type: types.REGISTER_USER_LOADING,
			},
			{
				type: types.REGISTER_USER_SUCCESS,
				payload: {"username": user.userName}
			}]

			expect(store.getActions()).toEqual(expectedAction);
		})

	})
	it("should dispatch registerUserError", () => {
		mock.onPost("http://localhost:8080/register").reply(400, {message: "register error"});

		return store.dispatch(userActions.registerUserAction(user)).then(()=>{
			let expectedAction = [{
				type: types.REGISTER_USER_LOADING,
			},
			{
				type: types.REGISTER_USER_ERROR,
				payload: "register error"
			}]

			expect(store.getActions()).toEqual(expectedAction);
		})

	})
})

	describe("loginUserAction", () =>{
		it("should dispatch loginUserisLoading", () => {
			let expectedAction = [{
				type: types.LOGIN_USER_LOADING,
			}]
		store.dispatch(userActions.loginUserAction(user))
		expect(store.getActions()).toEqual(expectedAction)

	})

		it("should dispatch loginUserSuccess", () => {
			mock.onPost("http://localhost:8080/login").reply(200, {jwtToken: "some token"});

			return store.dispatch(userActions.loginUserAction(user)).then(()=>{
				let expectedAction = [{
					type: types.LOGIN_USER_LOADING,
				},
				{
					type: types.LOGIN_USER_SUCCESS,
					payload: {"username": user.userName, "jwtToken": "some token"}
				}]

				expect(store.getActions()).toEqual(expectedAction);
			})

		})
		it("should dispatch loginUserError", () => {
			mock.onPost("http://localhost:8080/login").reply(400, {message: "login error"});

			return store.dispatch(userActions.loginUserAction(user)).then(()=>{
				let expectedAction = [{
					type: types.LOGIN_USER_LOADING,
				},
				{
					type: types.LOGIN_USER_ERROR,
					payload: "login error"
				}]

				expect(store.getActions()).toEqual(expectedAction);
			})
		})
		it("should return error string when no error message return from server", () => {
			mock.onPost("http://localhost:8080/login").reply(400);
			return store.dispatch(userActions.loginUserAction(user)).then(()=>{
				let expectedAction = [{
					type: types.LOGIN_USER_LOADING,
				},
				{
					type: types.LOGIN_USER_ERROR,
					payload: "some error occured, please try again!"
				}]
				expect(store.getActions()).toEqual(expectedAction);
			})
		})	
	})
})