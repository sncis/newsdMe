import configureMockStore from 'redux-mock-store';	
// import thunk from 'redux-thunk';
import mockAxios from 'axios';	


import * as actions from "../../../store/actions/userActions/loginActions"
import * as types from "../../../store/types/userTypes"
import thunk from "redux-thunk";


const configureMockStoreWithArg = (backendFetcher) => configureMockStore([thunk.withExtraArgument(backendFetcher)]);



describe("loginActions", () => {
	let user
	let store

	beforeEach(()=>{
		user = {"username": "someUser", "password": "somePassword"}

	})

	afterEach(()=>{
		store.clearActions()
	})

	it("should dispatch login succeeded", async () => {
		const backendFetcher = {
			backendFetcher: () => Promise.resolve({headers:{cookie:'some cookie'}}),
		}
		const mockStore = configureMockStoreWithArg(backendFetcher)
		store = mockStore()

		const expectedActions=[{
			type: types.IS_LOADING
		},{
			type: types.USER_LOGIN_SUCCEEDED,
			payload: {username: user.username}
		}]

		await store.dispatch(actions.loginUserAction(user)).then(()=>{
			expect(store.getActions()).toEqual(expectedActions)
		})
	})

	it("should dispatch loginUserFailed", async () => {
		const backendFetcher = {
			backendFetcher: () => Promise.reject({message:"some error"}),
		}
		const mockStore = configureMockStoreWithArg(backendFetcher)
		store = mockStore()
		const expectedActions=[{
			type: types.IS_LOADING
		},{
			type: types.USER_LOGIN_FAILED,
			payload: "some error"
		}]

		await store.dispatch(actions.loginUserAction(user)).then(()=>{
			expect(store.getActions()).toEqual(expectedActions)
		})
	})

	it("should perform logout",  () => {
		const backendFetcher = {
			backendFetcher: () => Promise.resolve({status:"ok"}),
		}
		const mockStore = configureMockStoreWithArg(backendFetcher)
		store = mockStore()

		const expectedActions=[{
			type: types.DO_LOGOUT_USER
		}]
		store.dispatch(actions.doLogout())
		expect(store.getActions()).toEqual(expectedActions)

	})
})
