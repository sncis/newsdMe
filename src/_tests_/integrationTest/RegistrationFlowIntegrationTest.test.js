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


