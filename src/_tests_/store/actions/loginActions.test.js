import configureMockStore from 'redux-mock-store';	
// import thunk from 'redux-thunk';
import mockAxios from 'axios';	


import * as actions from "../../../store/actions/userActions/loginActions"
import * as types from "../../../store/types/userTypes"
import thunk from "redux-thunk";
import {goToAdminSide} from "../../../store/actions/userActions/loginActions";


const configureMockStoreWithArg = (backendFetcher) => configureMockStore([thunk.withExtraArgument(backendFetcher)]);


describe("loginActions", () => {
	let user;
	let store;

	beforeEach(()=>{
		user = {"username": "someUser", "password": "somePassword"}

	});

	afterEach(()=>{
		store.clearActions()
	});

	it("should dispatch login succeeded", async () => {
		const backendFetcher =  () => Promise.resolve({headers:{cookie:'some cookie'}})
		
		const mockStore = configureMockStoreWithArg(backendFetcher)
		store = mockStore();

		const expectedActions=[{
			type: types.IS_LOADING
		},{
			type: types.USER_LOGIN_SUCCEEDED,
			payload: user.username
		}];

		await store.dispatch(actions.loginUserAction(user)).then(()=>{
			expect(store.getActions()).toEqual(expectedActions)
		})
	});

	it("should dispatch loginUserFailed", async () => {
		const backendFetcher =  () => Promise.reject({message:"some error"})
		
		const mockStore = configureMockStoreWithArg(backendFetcher)
		store = mockStore();
		const expectedActions=[{
			type: types.IS_LOADING
		},{
			type: types.USER_LOGIN_FAILED,
			payload: "some error"
		}];

		await store.dispatch(actions.loginUserAction(user)).then(()=>{
			expect(store.getActions()).toEqual(expectedActions)
		})
	});

	it("should perform logout",  async() => {
		const backendFetcher =  () => Promise.resolve({status:"ok"})
		
		const mockStore = configureMockStoreWithArg(backendFetcher)
		store = mockStore();

		const expectedActions=[{
			type: types.DO_LOGOUT_USER
		}];
		await store.dispatch(actions.logoutAction())
		expect(store.getActions()).toEqual(expectedActions)

	});

	it("should go to Admin side if user is admin", async() =>{
		const backendFetcher =  () => Promise.resolve({data:"its an admin"})
		
		const mockStore = configureMockStoreWithArg(backendFetcher)
		store = mockStore()
		const expectedActions =[{
			type: types.DO_ADMIN_SUCCEEDED,
			payload: "its an admin"
		}];
		await store.dispatch(actions.goToAdminSide())

		expect(store.getActions()).toEqual(expectedActions)
	});

	it("should should not go to AdminSide if user is normal user", async() =>{
		const backendFetcher =  () => Promise.reject({message:"sorry you are not allowed"})
		
		const mockStore = configureMockStoreWithArg(backendFetcher)
		store = mockStore()
		const expectedActions =[{
			type: types.DO_ADMIN_FAILED,
			payload: "sorry you are not allowed"
		}]
		await store.dispatch(actions.goToAdminSide())

		expect(store.getActions()).toEqual(expectedActions)
	})
});
