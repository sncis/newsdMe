import React from "react";
import {App} from "./App";
import {shallow} from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {Switch, Route } from 'react-router-dom'
 import ProtectedRoute from "./components/ProtectedRoute"
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from './pages/DashboardPage'

const mockStore = configureMockStore([thunk])
describe("App", () => {
  let component;
  let store

  beforeEach(()=>{
    component = shallow(<App />)
    store = mockStore({})
  })
  it("should renter whout errors", () => {
    expect(component.length).toEqual(1)
    expect(component.find(Route).length).toEqual(2)
    expect(component.find(Switch).length).toEqual(1)
    expect(component.find(ProtectedRoute).length).toEqual(1)
console.log(component.debug)

  })
  it("routes / to HomePage", () => {
    // eslint-disable-next-line no-undef
    expect(component.find('Route[exact=true][path="/"]').first().prop('component')).toBe(HomePage)

  });
  it("routes /auth/:index to AuthPage", () => {
    // eslint-disable-next-line no-undef
    expect(component.find('Route[path="/auth/:index"]').length).toBe(1)
    
  });
  it("routes /dashboard to DashboardPage", () => {
    // eslint-disable-next-line no-undef
    expect(component.find('ProtectedRoute[path="/dashboard"]').first().prop('component')).toBe(DashboardPage)
    
  });
});
