import { ItalicIcon } from '@primer/octicons-react'
import React from 'react'
import { shallow } from 'enzyme'

import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardComponent from '../../components/DashboardComponent'

describe("ProtectedRoute", ()=> {
	it("should render witout errors", ()=>{
		const component = shallow(<ProtectedRoute />)
		expect(component.length).toEqual(1)

	})
	it("should render passed compoenent when logedIn", () => {
		const component = shallow(<ProtectedRoute path="/dashboard" component={DashboardComponent} isLoggedIn={true}/>)
		expect(component.find('Route[path="/dashboard"]').length).toEqual(1)

	})

})