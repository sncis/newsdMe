import React from 'react'
import { shallow } from 'enzyme'
import { consoleSpyForProptypeError } from '../../setupTests'

import HeaderBarContainer from '../../containers/HeaderBarContainer'
import HeaderBar from '../../components/Header/HeaderBar'


describe("HeaderBarComponent", ()=>{
	let container;
	consoleSpyForProptypeError()

	it("should render without error", ()=>{
		container = shallow(<HeaderBarContainer onlyLogo={true} />)

		expect(container.find(HeaderBar).length).toEqual(1)
		expect(console.error).not.toHaveBeenCalled()
	})

	it("should throw error when wrong propTypes are provided", () =>{
		container = shallow(<HeaderBarContainer onlyLogo={"true"} />)
		expect(console.error).toHaveBeenCalled()

	})
})