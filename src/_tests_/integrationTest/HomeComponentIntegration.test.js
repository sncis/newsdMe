import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

import { mount, ReactWrapper } from "enzyme";
import mockAxios from 'axios'

import store from '../../store/store/store'
import  HomeComponent  from '../../components/HomeComponent';
import ArticleList from '../../components/Articles/ArticleList'
import Article from '../../components/Articles/Article'
import newsApiFetcher from "../../store/apiHelpers/newsApiFetcher";
import {testArticles} from "../testArticles";


jest.mock("../../store/apiHelpers/newsApiFetcher")


let articles = [{author: null,
	clean_url: "tagesspiegel.de",
	country: "DE",
	language: "de",
	link: "https://www.tagesspiegel.de/politik/atomgespraeche-in-wien-was-fuer-einen-deal-mit-dem-iran-spricht-und-was-dagegen/27108042.html",
	published_date: "2021-04-18 16:47:42",
	rank: "2124",
	rights: "tagesspiegel.de",
	summary: "Die Zeit wird knapp. Das sagt zumindest Irans Außenminister Dschawad Sarif und dringt auf eine rasche Lösung bei den Wiener Gesprächen zur Wiederbelebung des Atomabkommens.Sarif befürwortet die Vereinbarung mit dem Westen, aber er braucht rasche Erfolge. Denn die Hardliner in Teheran fordern den Abbruch der Verhandlungen. Und bald wird ein neuer Präsident gewählt. Innenpolitische Differenzen auf der iranischen Seite sind nur eines der Probleme bei den Gesprächen, die nach ersten Beratungen nun auf Expertenebene fortgesetzt werden sollen.",
	title: "Was für einen Deal mit dem Iran spricht",
	topic: "politics",
	_id: "a566a5dca65e7e53184b138813ae43ca"}
]


describe("HomeComponent", () =>{
	it("should render daily articles", async () => {

		newsApiFetcher.mockImplementationOnce(()=> Promise.resolve({
			data:{articles:testArticles}
		}))
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