import React from "react";
import App, { AppComp } from "./App";
import {shallow} from 'enzyme'
import {Switch, Route } from 'react-router-dom'
 import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./components/Home";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import DashboardComponent from "./components/DashboardComponent";
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe("AppComp", () => {
  let component;

  beforeEach(()=>{
    component = shallow(<AppComp />)

  })
  it("should renter whout errors", () => {
    expect(component.length).toEqual(1)
    expect(component.find(Route).length).toEqual(4)
    expect(component.find(Switch).length).toEqual(1)
    expect(component.find(ProtectedRoute).length).toEqual(1)


  })
  it("routes / to HomeComponen", () => {
    // eslint-disable-next-line no-undef
    expect(component.find('Route[exact=true][path="/"]').first().prop('component')).toBe(Home)
    
  });
  it("routes /home to HomeComponent", () => {
    // eslint-disable-next-line no-undef
    expect(component.find('Route[path="/home"]').first().prop('component')).toBe(Home)
    
  });
  it("routes /register to RegisterComponent", () => {
    // eslint-disable-next-line no-undef
    expect(component.find('Route[path="/register"]').first().prop('component')).toBe(RegisterComponent)
    
  });
  it("routes /login to LoginComponent", () => {
    // eslint-disable-next-line no-undef
    expect(component.find('Route[path="/login"]').first().prop('component')).toBe(LoginComponent)
    
  });
  it("routes /dashboard to LoginComponent", () => {
    // eslint-disable-next-line no-undef
    expect(component.find('ProtectedRoute[path="/dashboard"]').first().prop('component')).toBe(DashboardComponent)
    
  });
});
