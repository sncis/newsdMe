import React from 'react'
import { shallow } from 'enzyme'
import { Link } from "react-router-dom";

import LogoComponent from '../../../components/Header/LogoComponent'
import { consoleSpyForProptypeError } from '../../../setupTests'


describe("LogoComponent", () => {
	let component;

	consoleSpyForProptypeError()

	it("should render whitout error", ()=>{
		component = shallow(<LogoComponent link='/someLink' />)
		expect(component.length).toEqual(1)
		expect(component.find(Link).length).toEqual(1)
		expect(console.error).not.toHaveBeenCalled()
	})

	it("should throw error when wrong propTypes is provided", () => {
		shallow(<LogoComponent link={true} />)
		expect(console.error).toHaveBeenCalledTimes(2)
	})

})