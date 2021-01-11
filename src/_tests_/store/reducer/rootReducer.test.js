import * as types  from "../../../store/constants/userTypes"
import reducer from "../../../store/reducers/rootReducer"


describe("rootReducer", () => {

	it("should return initial state", () => {
		const action = {type:''};
		expect(reducer(undefined, action)).toEqual(
			{isLoading:false}
		)
	})

	it("should handle REGISTER_USER_LOADING", () => {
		const action = { type: types.REGISTER_USER_LOADING}
		expect(reducer(undefined, action)).toEqual(
			{
				isLoading: true
			}
		)
	})

	it("should handle REGISTER_USER_SUCCESS", () => {
		const action = { type: types.REGISTER_USER_SUCCESS, payload:{username: "some user"}}
		expect(reducer(undefined, action)).toEqual(
			{
				isLoading: false,
				username: "some user"
			}
		)
	})

	it("should handle REGISTER_USER_ERROR", () => {
		const action = { type: types.REGISTER_USER_ERROR, payload: "register error"}
		expect(reducer(undefined, action)).toEqual(
			{
				isLoading: false,
				errorMsg: "register error"
			}
		)
	})

	it("should handle LOGIN_USER_LOADING", () => {
		const action = { type: types.LOGIN_USER_LOADING}
		expect(reducer(undefined, action)).toEqual(
			{
				isLoading: true
			}
		)
	})

	it("should handle LOGIN_USER_SUCCESS", () => {
		const action = { type: types.LOGIN_USER_SUCCESS, payload: {userName: "some user", jwtToken: "some token"}}
		expect(reducer(undefined, action)).toEqual(
			{
				userName: 'some user',
				jwtToken: "some token",
				isLoading: false,
			}
		)
	})

	it("should handle LOGIN_USER_ERROR", () => {
		const action = { type: types.LOGIN_USER_ERROR, payload: "login error"}
		expect(reducer(undefined, action)).toEqual(
			{
				isLoading: false,
				errorMsg: "login error"
			}
		)
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