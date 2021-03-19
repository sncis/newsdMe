import React from 'react'
import {shallow} from 'enzyme'

import HeaderBar from '../../../components/Header/HeaderBar'
import { consoleSpyForProptypeError } from '../../../setupTests'
import LogoComponent from '../../../components/Header/LogoComponent'
import { Search } from '../../../components/Header/SearchComponent'
import { HeaderAuth } from '../../../components/Header/HeaderAuthComponent'


describe("HeaderBar", () => {
	consoleSpyForProptypeError()

	it("should render without errors", () => {
		const component = shallow(<HeaderBar left={<LogoComponent link=''/>} middle={<Search handelArticleSearch={jest.fn()} />} right={<HeaderAuth />} onlyLogo={false}/>)
		
		expect(component.length).toEqual(1)
		expect(component.find(LogoComponent).length).toEqual(1)
		expect(component.find(Search).length).toEqual(1)
		expect(component.find(HeaderAuth).length).toEqual(1)

		expect(console.error).not.toHaveBeenCalled()
	})
	
	it("should render only logo when onlyLogo props is true", () => {
		const component = shallow(<HeaderBar left={<LogoComponent link=''/>} middle={<Search handelArticleSearch={jest.fn()} />} right={<HeaderAuth />} onlyLogo={true}/>)
		expect(component.length).toEqual(1)
		expect(component.find(LogoComponent).length).toEqual(1)
		expect(component.find('.hidden').length).toEqual(2)

		expect(console.error).not.toHaveBeenCalled()
	})

	it('should throw console error when wrong propTypes are provided', () => {
		shallow(<HeaderBar middle={<Search handelArticleSearch={jest.fn()} />} right={<HeaderAuth />} />)
		expect(console.error).toHaveBeenCalledTimes(1)
	})
})