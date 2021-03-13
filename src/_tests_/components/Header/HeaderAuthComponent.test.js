import React from 'react'
import {BrowserRouter as Router }  from 'react-router-dom'
import { shallow } from 'enzyme'
import { Link } from "react-router-dom";
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { consoleSpyForProptypeError } from '../../../setupTests'
import HeaderAuthComponent, { HeaderAuth }from '../../../components/Header/HeaderAuthComponent'

const mockStore = configureMockStore([thunk])

describe("HeaderAuthComponent", ()=>{
	let component;

	describe("when user is not loggedIn", ()=> {
		consoleSpyForProptypeError()
		 
		it("should render without errors", ()=>{
			component = shallow(<HeaderAuth isLoggedIn={false} logout={jest.fn()} />)

			expect(component.find(Link).length).toEqual(2)
			expect(component.contains("Login")).toBeTruthy()
			expect(component.contains("Register")).toBeTruthy()

			expect(console.error).not.toHaveBeenCalled()
		})

		it('should throw error when wrong proptypes are provided', ()=>{
			const store = mockStore({logout: '',userReducer:{
				loggedIn: ""
			}})

			component = shallow(<Router><HeaderAuthComponent store={store} 
			/>
				</Router>)
			
			expect(console.error).toHaveBeenCalled()

		})
	})
})