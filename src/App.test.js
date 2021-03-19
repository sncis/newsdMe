import React from "react";
import {App} from "./App";
import {shallow} from 'enzyme'

import {Switch, Route } from 'react-router-dom'
 import ProtectedRoute from "./components/ProtectedRoute"
import HomePage from "./pages/HomePage";
import DashboardPage from './pages/DashboardPage'

describe("App", () => {
  let component;

  beforeEach(()=>{
    component = shallow(<App />)
  })

  it("should renter whout errors", () => {
    expect(component.length).toEqual(1)
    expect(component.find(Route).length).toEqual(2)
    expect(component.find(Switch).length).toEqual(1)
    expect(component.find(ProtectedRoute).length).toEqual(1)
  })

  it("routes / to HomePage", () => {
    expect(component.find('Route[exact=true][path="/"]').first().prop('component')).toBe(HomePage)
  });

  it("routes /auth/:index to AuthPage", () => {
    expect(component.find('Route[path="/auth/:index"]').length).toBe(1) 
  });

  it("routes /dashboard to DashboardPage", () => {
    expect(component.find('ProtectedRoute[path="/dashboard"]').first().prop('component')).toBe(DashboardPage) 
  });
});
