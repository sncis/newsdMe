import configureMockStore from 'redux-mock-store';	
import thunk from 'redux-thunk';	
import mockAxios from 'axios';	

import * as userActions from "../../../store/actions/userActions"
import * as types from "../../../store/types/userTypes"

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

	it("should dispatch registerUserSucess",  async ()  => {
		const expectedAction = [{
			type: types.USER_LOADING,
		},
		{
			type: types.REGISTER_USER_SUCCESS,
			payload: "someUsername"
		}]

		mockAxios.post.mockImplementationOnce(() => Promise.resolve({
			data:{userName: "someUsername"}
		}));

		await store.dispatch(userActions.registerUserAction(user)).then(() =>{
			expect(store.getActions()).toEqual(expectedAction);
		 })
	})

	it("should dispatch registerUserError", async () => {
		const expectedAction = [{
			type: types.USER_LOADING,
		},
		{
			type: types.REGISTER_USER_ERROR,
			payload: "register error"
		}]

		mockAxios.post.mockImplementationOnce(()=> Promise.reject({
			response:{data:{message: "register error"}}
		}))

		 await store.dispatch(userActions.registerUserAction(user)).then(()=>{
			expect(store.getActions()).toEqual(expectedAction);
		})

	})
})

	describe("loginUserAction", () => {
	it("should dispatch loginUserSuccess", async () =>{
		const expectedAction =[{
			type: types.USER_LOADING
			},{
			type: types.LOGIN_USER_SUCCESS,
			payload: {userName: user.userName, jwtToken: "some token"}
		}]

		mockAxios.post.mockImplementationOnce(() => 
			Promise.resolve({data: {jwtToken: "some token"}
		}))

		await store.dispatch(userActions.loginUserAction(user)).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
		})

	})

	it("should dispatch loginUserError", async () =>{
		const expectedAction =[{
			type: types.USER_LOADING
			},{
			type: types.LOGIN_USER_ERROR,
			payload: "some error"
		}]

		mockAxios.post.mockImplementationOnce(()=> Promise.reject({
			response:{data:{message: "some error"}}
		}))
		
		await store.dispatch(userActions.loginUserAction(user)).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
		})

	})

	it("should dispatch loginUserError and return pre-defined error string when no response message from server", async () =>{
		const expectedAction =[{
			type: types.USER_LOADING
			},{
			type: types.LOGIN_USER_ERROR,
			payload: "some error occured, please try again!"
		}]

		mockAxios.post.mockImplementationOnce(()=> 
			Promise.reject({}))
	
		await store.dispatch(userActions.loginUserAction(user)).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
		})
		})
	})

	describe("logout", () => {
		it("should perform logout action", () => {
			store.dispatch(userActions.logoutAction())

			expect(store.getActions()).toEqual([{type: types.LOGOUT_USER}])
		})
	})	
})

