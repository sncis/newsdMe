import * as types  from "../../../store/types/userTypes"
import userReducer from "../../../store/reducers/userReducer"


describe("userReducer", () => {

	it("should return initial state", () => {
		const action = {type:''};

		expect(userReducer(undefined, action)).toEqual({
			loggedIn: false,
			}
		)
	})

	it("should handle REGISTER_USER_LOADING", () => {
		const action = { type: types.IS_LOADING}
		expect(userReducer(undefined, action)).toEqual(
			{
				loggedIn: false,
				isLoading: true,
				errorMsg:'',
			}
		)
	})

	it("should handle USER_REGISTER_SUCCEEDED", () => {
		const action = { type: types.USER_REGISTER_SUCCEEDED, payload:{username: "some user", confirmationToken: "some token "}}
		expect(userReducer(undefined, action)).toEqual(
			{
				isLoading: false,
				username: "some user",
				registered: true,
				loggedIn: false,
				errorMsg:'',
				confirmationToken:"some token "
			}
		)
	})

	it("should handle USER_REGISTRATION_FAILED", () => {
		const action = { type: types.USER_REGISTRATION_FAILED, payload: "register error"}
		expect(userReducer(undefined, action)).toEqual(
			{
				isLoading: false,
				errorMsg: "register error",
				loggedIn: false,
				registered: false,
			}
		)
	})


	it("should handle CONFIRM_REGISTRATION_SUCCEEDED", () => {
		const action = {type: types.CONFIRM_REGISTRATION_SUCCEEDED}
		expect(userReducer(undefined,action)).toEqual({
			isLoading:false,
			loggedIn:false,
			registered: true,
		})
	})

	it("should handle CONFIRM_REGISTRATION_FAILED", () => {
		const action = {type: types.CONFIRM_REGISTRATION_FAILED, payload: "registration error"}
		expect(userReducer(undefined,action)).toEqual({
			isLoading:false,
			loggedIn:false,
			errorMsg:"registration error",
			registered: false,
		})
	})



	it("should handle LOGIN_USER_LOADING", () => {
		const action = { type: types.IS_LOADING}
		expect(userReducer(undefined, action)).toEqual(
			{
				isLoading: true,
				loggedIn: false,
				errorMsg:''
			}
		)
	})

	it("should handle USER_LOGIN_SUCCEEDED", () => {
		const action = { type: types.USER_LOGIN_SUCCEEDED, payload: {username: "some user"}}
		expect(userReducer(undefined, action)).toEqual(
			{
				username: 'some user',
				isLoading: false,
				loggedIn: true,
				errorMsg:''
			}
		)
	})

	it("should handle USER_LOGIN_FAILED", () => {
		const action = { type: types.USER_LOGIN_FAILED, payload: "login error"}
		expect(userReducer(undefined, action)).toEqual(
			{
				isLoading: false,
				errorMsg: "login error",
				loggedIn: false
			}
		)
	})

	it("should hanlde userLogout", () =>{
		const action ={type: types.DO_LOGOUT_USER}
		expect(userReducer(undefined,action)).toEqual({
			loggedIn: false
		})
	})
})
