import React from 'react'
import { shallow } from 'enzyme'
import { consoleSpyForProptypeError } from '../../../setupTests'

import { Search } from '../../../components/Header/SearchComponent'

describe("SearchComponent", () => {
	let component;
	consoleSpyForProptypeError()

	beforeEach(()=>{
		component = shallow(<Search handelArticleSearch={jest.fn()} />)

	})
	it("should render without errors", ()=>{ 		
		expect(component.length).toEqual(1)
		expect(component.find('.search-input').length).toEqual(1)
		expect(component.find("button").length).toEqual(1)
		expect(console.error).not.toHaveBeenCalled()

	})
	it("should set searchterm when user types in input field", () =>{
		const input = component.find(".search-input")
		input.simulate('change',{target:{value:"some search term"}})
		expect(component.state('searchTerm')).toBe('some search term')
	})

	it("should henadleSearch when clicking on button", ()=>{
		const button = component.find('button')
		button.simulate('click')

		expect(component.instance().props.handelArticleSearch).toHaveBeenCalled()
	})

	

})
describe("SearchComponent", ()=> {
	consoleSpyForProptypeError()

	it('should throw error when wrong ptoptypes are provided', ()=>{
		shallow(<Search handelArticleSearch="some proptype" />)
		expect(console.error).toHaveBeenCalledTimes(1)
	})

})