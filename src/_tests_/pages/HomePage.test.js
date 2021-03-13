import React from 'react'
import { shallow } from 'enzyme'

import { consoleSpyForProptypeError } from '../../setupTests'

import { HomePage } from '../../pages/HomePage'
import PageContainer from '../../containers/PageContainer'
import { Home } from '../../components/Home'


describe('HomePage', () =>{
	consoleSpyForProptypeError()

	it("should render without errors", () =>{

		const page = shallow(<HomePage />)
		console.log(page.debug())

		expect(page.find(PageContainer).length).toEqual(1)
		expect(page.find(Home).length).toEqual(1)

	})
})
