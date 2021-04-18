/* eslint-disable no-undef */
import React from "react";
import  {HomeComponent}  from "../../components/HomeComponent";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ArticleList from "../../components/Articles/ArticleList"

jest.mock("../../components/Articles/ArticleList")

describe("HomeComponent", () => {
  let component;
  let store;

	const mockStore = configureMockStore([thunk])

  beforeEach(()=>{
    store = mockStore({})
    const props = {
			loadDailyArticles: jest.fn(),
		}
   
    store.dispatch = jest.fn()
    component = mount(<HomeComponent store={store} {...props} />)
    })
  
  it("should render childrens", () => {
    console.log(component.debug())
    expect(component.length).toEqual(1)

    expect(component.find("h2")).toHaveLength(1);
    expect(component.find(ArticleList)).toHaveLength(1);
    expect(component.instance().props.loadDailyArticles).toHaveBeenCalledTimes(1)

  });
});
