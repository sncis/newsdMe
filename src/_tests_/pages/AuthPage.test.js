import React from 'react'
import { shallow } from 'enzyme'

import { consoleSpyForProptypeError } from '../../setupTests'

import AuthPage from '../../pages/AuthPage'
import AuthDialogContainer from '../../containers/AuthDialogContainer'
import LoginComponent from '../../components/Auth/LoginComponent'
import RegisterComponent from '../../components/Auth/RegisterComponent'
import PageContainer from '../../containers/PageContainer'

jest.mock('../../components/Auth/LoginComponent', ()=>"LoginComponent")
jest.mock('../../components/Auth/RegisterComponent', ()=>"RegisterComponent")
describe("AuthPage", ()=> { 
	let page;

	describe("Login Dialog", ()=> {
		consoleSpyForProptypeError()

		const props = {
			match:{params:{index:"1"}},
		}


		it("should render whitout errors", () => {
			page = shallow(<AuthPage {...props} />)

			expect(console.error).not.toHaveBeenCalled()

			expect(page.find(AuthDialogContainer).length).toEqual(1)
			expect(page.find(PageContainer).length).toEqual(1)
			expect(page.find(LoginComponent).length).toEqual(1)
			expect(page.find(RegisterComponent).length).toEqual(0)

		})

		it("should show register dialog when clicking on register", () =>{
			page = shallow(<AuthPage {...props} />)

			const registerLink = page.find('#registerLink')

			expect(page.find(LoginComponent).length).toEqual(1)
			expect(page.find(RegisterComponent).length).toEqual(0)

			registerLink.simulate("click")

			expect(page.find(LoginComponent).length).toEqual(0)
			expect(page.find(RegisterComponent).length).toEqual(1)
		})

	})
	describe("Register dialog", () =>{
		let page
		consoleSpyForProptypeError()

		const props = {
			match:{params:{index:"2"}},
		}
		it("should render without errors", () =>{
			page = shallow(<AuthPage {...props} />)

			expect(page.find(RegisterComponent).length).toEqual(1)

			expect(page.find(AuthDialogContainer).length).toEqual(1)
			expect(page.find(PageContainer).length).toEqual(1)
			expect(page.find(LoginComponent).length).toEqual(0)

			expect(console.error).not.toHaveBeenCalled()

		})

		it("should show login dialog when clicking on login", () =>{
			page = shallow(<AuthPage {...props} />)

			const registerLink = page.find('#loginLink')

			expect(page.find(LoginComponent).length).toEqual(0)
			expect(page.find(RegisterComponent).length).toEqual(1)

			registerLink.simulate("click")

			expect(page.find(LoginComponent).length).toEqual(1)
			expect(page.find(RegisterComponent).length).toEqual(0)
		})

	})	
})

describe("AuthPage with wrong propTypes", () =>{
	consoleSpyForProptypeError()

	it("should throw error", ()=>{
		const props = {
			match:{params:{index:true}},
		}
	 shallow(<AuthPage {...props} />)

	 expect(console.error).toHaveBeenCalledTimes(1)
	})	
})
