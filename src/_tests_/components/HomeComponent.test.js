/* eslint-disable no-undef */
import React from "react";
import Home from "../../components/HomeComponent";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ArticleList from "../../components/Articles/ArticleList"

jest.mock("../../components/Articles/ArticleList")


describe("HomeComponent", () => {
  let component;
  let store;

  const mockStore = configureMockStore([thunk])

  beforeEach(()=>{
    store = mockStore({userReducer: {
      loggedIn : true
     } 
    })

    store.dispatch = jest.fn()

    component = mount(<Home store={store} loadDailyArticles={jest.fn()} />)
  })
  it("should render childrens", () => {

    expect(component.find("h2")).toHaveLength(1);
    expect(component.find(ArticleList)).toHaveLength(1);
    expect(store.dispatch).toHaveBeenCalled()
  });
});
