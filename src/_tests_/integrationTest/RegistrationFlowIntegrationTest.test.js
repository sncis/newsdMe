import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { act } from 'react-dom/test-utils';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


import store from '../../store/store/store'
import RegisterComponent from "../../components/Auth/RegisterComponent";

import backendAxiosInstance from '../../store/apiHelpers/backendAxiosInstance'

jest.mock("../../store/apiHelpers/backendAxiosInstance")


describe("RegsiterCompoent", () => {

  afterEach(()=>{
    jest.restoreAllMocks();
    cleanup();
  })

  test("should redirect after succesfull registration", async () => {
    
    render(<BrowserRouter>
      <RegisterComponent store={store} />
      <Switch>
        <Route path='/confirm/1'>confirmation page</Route>
      </Switch>
      </BrowserRouter>
    )
  
    backendAxiosInstance.request.mockImplementationOnce(() => Promise.resolve({data:'', status:200}));
    backendAxiosInstance.request.mockImplementationOnce(() => Promise.resolve({response:{data:'', status:200}}));

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText("Username"),"someUser")
    userEvent.type(screen.getByLabelText("Email"),"some@email.com")
    userEvent.type(screen.getByLabelText("Password"),"somePass1234!")
    userEvent.type(screen.getByLabelText("Confirm Password"),"somePass1234!")    

    expect(screen.queryByText(/confirmation page/)).toBeNull();

    act(()=>
      userEvent.click(screen.getByRole('button'))
    )

    expect(await screen.findByText(/Loading.../)).toBeInTheDocument()
    expect(await screen.findByText(/confirmation page/)).toBeInTheDocument()
    

  })
  test("should render error email message when form is not valid", async () => {
   
    render(<BrowserRouter>
      <Switch>
        <RegisterComponent store={store} /> 
        <Route path="/confirm/1">confirmation page</Route>
      </Switch>
    </BrowserRouter>)
  
  screen.debug()


  backendAxiosInstance.request.mockImplementationOnce(() => Promise.resolve({data:'', status:200}));
  backendAxiosInstance.request.mockImplementationOnce(() => Promise.reject({response:{data:'some error', status:400}}));


  expect(screen.getByText('Username')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
  expect(screen.getByText('Confirm Password')).toBeInTheDocument();

  userEvent.type(screen.getByLabelText("Username"),"someUser")
  userEvent.type(screen.getByLabelText("Email"),"someemail.com")
  userEvent.type(screen.getByLabelText("Password"),"somePass1234!")
  userEvent.type(screen.getByLabelText("Confirm Password"),"somePass1234!")    

  act(()=>
    userEvent.click(screen.getByRole('button'))
  )

  expect(await screen.findByText(/invalid email/)).toBeInTheDocument()
  expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument()
  expect(screen.queryByText(/confirmation page/)).not.toBeInTheDocument()
  expect(screen.queryByText(/some error/)).not.toBeInTheDocument()
})


  test("should render error message and not redirect after failed registration", async () => {
   
    render(<BrowserRouter>
      <Switch>
      <RegisterComponent store={store} /> 
        <Route path="/confirm/1">confirmation page</Route>
      </Switch>
    </BrowserRouter>)
    
  
    backendAxiosInstance.request.mockImplementationOnce(() => Promise.resolve({data:'', status:200}));
    backendAxiosInstance.request.mockImplementationOnce(() => Promise.reject({response:{data:'some error', status:400}}));


    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText("Username"),"someUser")
    userEvent.type(screen.getByLabelText("Email"),"some@email.com")
    userEvent.type(screen.getByLabelText("Password"),"somePass1234!")
    userEvent.type(screen.getByLabelText("Confirm Password"),"somePass1234!")    

    act(()=>
      userEvent.click(screen.getByRole('button'))
    )

    expect(await screen.findByText(/Loading.../)).toBeInTheDocument()
    expect(await screen.findByText(/some error/)).toBeInTheDocument()
    expect(screen.queryByText(/confirmation page/)).not.toBeInTheDocument()
  })

  





})



// describe("RegisterComponent", () => {
//   it("should register user", async () => {
//     let component;

//     const history = {
//       push: jest.fn(),
//       location: {
//         pathname: '/en/data-collection/property-valuation/'
//       },
//       listen: jest.fn()}

//     backendApiFetcher.mockImplementationOnce(()=> Promise.resolve({
//       data:{message:"some error"},
//       status:400
//     }))

//     act(()=>{
//        component = mount(
//         <BrowserRouter>
//           <RegisterComponent store ={store} />
//         </BrowserRouter>
//      ).childAt(0).childAt(0).childAt(0).childAt(0)

//     })
     
//     component.find('#username').simulate('change',{target:{value:"someUser",name:'username'}})
//     component.find('#email').simulate('change',{target:{value:"some@email.com",name:'email'}})
//     component.find('#password').simulate('change',{target:{value:"someUser1234!",name:'password'}})
//     component.find('#confirmPassword').simulate('change',{target:{value:"someUser1234!",name:'confirmPassword'}})

//     console.log(component.state())
//     act(()=>{
//       component.find('#submit-btn').simulate('click')

//     })
//     // component.update()
//     // console.log(component.debug())
//     // component.instance().submitRegistration({preventDefault(){}});

//     component.update()

//     await component.props().registrationErrorMsg

//     // expect(component.find('#registrationErrorMsg').length).toBe(1)

//     console.log(component.debug())
//     console.log(component.props())


//     expect(component.find('#registrationErrorMsg').text()).toEqual("some error")

//     // const spy = jest.spyOn(component.instance(), 'submitRegistration')
//     // component.update()
//     // expect(spy).toHaveBeenCalled()
//     // expect(component.find('#passwordMatchingError').length).toEqual(1);

//     // console.log(component.debug())

//     // expect(window.location).toEqual("/confirm")
//     // await component.instance.props("isRegistrationSuccess")
//     // // const spy = jest.spyOn(window.location, "push")
//     //
//     // expect(component.prop("isRegistrationSuccess")).toEqual(true);

//     // expect(spy).toHaveBeenCalledWith('/confirm')

//   })

// })