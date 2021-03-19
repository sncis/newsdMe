import * as types  from "../../../store/types/userTypes"
import userReducer from "../../../store/reducers/userReducer"


describe("userReducer", () => {

	it("should return initial state", () => {
		const action = {type:''};

		expect(userReducer(undefined, action)).toEqual({
			isLoading:false,
			loggedIn: false

			}
		)
	})

	it("should handle REGISTER_USER_LOADING", () => {
		const action = { type: types.USER_LOADING}
		expect(userReducer(undefined, action)).toEqual(
			{
				isLoading: true,
				loggedIn: false

			}
		)
	})

	it("should handle REGISTER_USER_SUCCESS", () => {
		const action = { type: types.REGISTER_USER_SUCCESS, payload:{username: "some user"}}
		expect(userReducer(undefined, action)).toEqual(
			{
				isLoading: false,
				userName: "some user",
				registerSuccessful: true,
				loggedIn: false

			}
		)
	})

	it("should handle REGISTER_USER_ERROR", () => {
		const action = { type: types.REGISTER_USER_ERROR, payload: "register error"}
		expect(userReducer(undefined, action)).toEqual(
			{
				isLoading: false,
				errorMsg: "register error",
				loggedIn: false

			}
		)
	})

	it("should handle LOGIN_USER_LOADING", () => {
		const action = { type: types.USER_LOADING}
		expect(userReducer(undefined, action)).toEqual(
			{
				isLoading: true,
				loggedIn: false

			}
		)
	})

	it("should handle LOGIN_USER_SUCCESS", () => {
		const action = { type: types.LOGIN_USER_SUCCESS, payload: {userName: "some user", jwtToken: "some token"}}
		expect(userReducer(undefined, action)).toEqual(
			{
				userName: 'some user',
				jwtToken: "some token",
				loginSuccessful: true,
				isLoading: false,
				loggedIn: true

			}
		)
	})

	it("should handle LOGIN_USER_ERROR", () => {
		const action = { type: types.LOGIN_USER_ERROR, payload: "login error"}
		expect(userReducer(undefined, action)).toEqual(
			{
				isLoading: false,
				errorMsg: "login error",
				loginSuccessful: false,
				loggedIn: false

			}
		)
	})

	it("should hanlde userLogout", () =>{
		const action ={type: types.LOGOUT_USER}
		expect(userReducer(undefined,action)).toEqual({
			isLoading: false,
  		loggedIn: false
		})
	})
})




// describe('todos reducer', () => {
//   it('should return the initial state', () => {
//     expect(reducer(undefined, {})).toEqual([
//       {
//         text: 'Use Redux',
//         completed: false,
//         id: 0
//       }
//     ])
//   })

//   it('should handle ADD_TODO', () => {
//     expect(
//       reducer([], {
//         type: types.ADD_TODO,
//         text: 'Run the tests'
//       })
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }
//     ])