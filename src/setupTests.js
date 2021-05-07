// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom'
// import "@testing-library/jest-dom/extend-expect";
import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";


configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.render = render;

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });


export const consoleSpyForProptypeError = () => {
  let spy;
  beforeEach(()=>{
    spy = jest.spyOn(global.console, 'error')
  })

  afterEach(()=>{
    spy.mockRestore()
  })

}