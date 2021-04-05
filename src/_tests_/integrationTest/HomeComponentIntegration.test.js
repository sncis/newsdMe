import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

import { mount, ReactWrapper } from "enzyme";
import mockAxios from 'axios'

import store from '../../store/store/store'
import  HomeComponent  from '../../components/HomeComponent';
import ArticleList from '../../components/Articles/ArticleList'
import Article from '../../components/Articles/Article'

let articles = [{id: 30, 
	title:"daily3 some third article", 
	description: "daily3 some third description", 
	url: "daily3 someUrl", 
	urlToImage: "daily3 url third to image", 
	source:{name: "daily3 source"}, 
	isBookmarked: false}
]


describe("HomeComponent", () =>{
	it("should render daily articles", async () => {
		 mockAxios.get.mockImplementationOnce(() => 
		Promise.resolve({data:{articles:articles}}
	))
	const spy = jest.spyOn(global.localStorage, "getItem")

	spy.mockImplementationOnce().mockReturnValueOnce(JSON.stringify(articles))

	const component = mount(<Provider store={store}> 
			<BrowserRouter> 	
				<HomeComponent />
			</BrowserRouter>
		</Provider>)

	await component.find(ArticleList)
	component.update()
	
	expect(component.find(ArticleList).length).toEqual(1)
	expect(component.find(Article).length).toEqual(1)
	expect(component.find('.noArticleError').length).toEqual(0)
	expect(component.find('.loadingMsg').length).toEqual(0)
	})
})