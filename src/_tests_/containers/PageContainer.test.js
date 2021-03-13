import React from 'react'
import { shallow } from 'enzyme'

import PageContainer from '../../containers/PageContainer'
import HeaderBarContainer from "../../containers/HeaderBarContainer"
import { consoleSpyForProptypeError } from '../../setupTests'

describe("PageContainer", () => {
	consoleSpyForProptypeError()

	it("should render without errors", ()=> {
		const children = (<div><h1>Hello</h1></div>)
		const page = shallow(<PageContainer onlyLogo={true} children={children}/>)

		expect(page.find(HeaderBarContainer).length).toEqual(1)
		expect(page.contains(children)).toBeTruthy()
		expect(console.error).not.toHaveBeenCalled()
	})

	it("should throw error when wrong propTypes are provided", ()=>{
		shallow(<PageContainer onlyLogo="true" />)
		expect(console.error).toHaveBeenCalled()
	})
})