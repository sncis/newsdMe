import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'

import AuthDialogContainer from '../../containers/AuthDialogContainer'
import { consoleSpyForProptypeError } from '../../setupTests'

describe("AuthDialogContainer", ()=>{
	let container
	consoleSpyForProptypeError()

	it("should render witout errors", ()=> {
		const children =(<div><p>Hello</p></div>)
		container = shallow(<AuthDialogContainer title={"some title"} children={children} />)

		expect(container.contains(children)).toBeTruthy()
		expect(container.find(Link).length).toEqual(1)
		expect(container.find('.auth-title').text()).toEqual('some title')
		expect(console.error).not.toHaveBeenCalled()
	})
	it("should throw error when wrong PropTypes are provided", ()=>{
		container = shallow(<AuthDialogContainer  children={{}} />)
		expect(console.error).toHaveBeenCalled()
	})
})

