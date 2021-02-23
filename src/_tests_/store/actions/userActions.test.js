import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';	
import mockAxios from 'axios';	

import * as userActions from "../../../store/actions/userActions"
import * as types from "../../../store/constants/userTypes"

const middleware = [thunk];	
const mockStore = configureMockStore(middleware);	
const store = mockStore({});


describe("userActions", () => {
	let user;


	beforeEach(() => {
		store.clearActions();
		user = {"userName": "someUser", "password": "somePassword"}

		mockAxios.mockClear()

	})

	describe("registerUserAction",  () => {

	it("should dispatch registerUserSuccess",  async ()  => {
		mockAxios.post.mockImplementationOnce(() => Promise.resolve({
			data:{
				userName: "someUsername"
			}
		}));

		await store.dispatch(userActions.registerUserAction(user)).then(() =>{
			let expectedAction = [{
				type: types.USER_LOADING,
			},
			{
				type: types.REGISTER_USER_SUCCESS,
				payload: "someUsername"
			}]
			expect(store.getActions()).toEqual(expectedAction);

		 })

	})

	it("should dispatch registerUserError", () => {
		mockAxios.post.mockImplementationOnce(()=> Promise.reject({
			response:{
				data:{
					message: "register error"
				}
			}
		}))

		 store.dispatch(userActions.registerUserAction(user)).then(()=>{
			let expectedAction = [{
				type: types.USER_LOADING,
			},
			{
				type: types.REGISTER_USER_ERROR,
				payload: "register error"
			}]

			expect(store.getActions()).toEqual(expectedAction);
		})

	})
})

	describe("loginUserAction", () => {
	it("should dispatch loginUserSuccess", async () =>{
		mockAxios.post.mockImplementationOnce(()=> 
		Promise.resolve({
			data: {
				jwtToken: "some token"
			}
		}))
		let expectedAction =[{
			type: types.USER_LOADING
			},{
			type: types.LOGIN_USER_SUCCESS,
			payload: {userName: user.userName, jwtToken: "some token"}
		}]

		const spy = jest.spyOn(global.localStorage, 'setItem')

		await store.dispatch(userActions.loginUserAction(user)).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
			expect(spy).toHaveBeenCalled()
		})

	})

	it("should dispatch loginUserError", async () =>{
		mockAxios.post.mockImplementationOnce(()=> 
		Promise.reject({
			response: {
				data: {
					message: "some error"
			}}
		}))
		let expectedAction =[{
			type: types.USER_LOADING
			},{
			type: types.LOGIN_USER_ERROR,
			payload: "some error"
		}]

		await store.dispatch(userActions.loginUserAction(user)).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
		})

	})

	it("should dispatch loginUserError and return pre-defined error string when no response message from server", async () =>{
		mockAxios.post.mockImplementationOnce(()=> 
		Promise.reject({
			response: {}
		}))
		let expectedAction =[{
			type: types.USER_LOADING
			},{
			type: types.LOGIN_USER_ERROR,
			payload: "some error occured, please try again!"
		}]

		await store.dispatch(userActions.loginUserAction(user)).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
		})

	})
	})

	describe("logout", () => {
		it("should perform logout action", () => {
			const spy = jest.spyOn(global.localStorage, 'removeItem')

			store.dispatch(userActions.logoutAction())

			expect(spy).toHaveBeenCalled()
			expect(store.getActions()).toEqual([{type: types.LOGOUT_USER}])
		})
	})
	
})

