import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'

import { NavBarComponent } from "../../components/NavBar"


describe("NavBar", ()=>{
	it("should render login and register link when user is not loggedIn ", () => {
		const component = shallow(<NavBarComponent isLoggedIn={false} />)

		expect(component.length).toEqual(1)
		expect(component.find(Link).length).toEqual(2)
		expect(component.find('.registerLink').length).toEqual(1)
		expect(component.find('.loginLink').length).toEqual(1)


	})

	it("should render logout when logedIn", () => {
		const component = shallow(<NavBarComponent isLoggedIn={true} />)

		expect(component.length).toEqual(1)
		expect(component.find(Link).length).toEqual(2)
		expect(component.find('.homeLink').length).toEqual(1)
		expect(component.find('.dashboardLink').length).toEqual(1)
	})
})